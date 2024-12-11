import pandas as pd
import plotly as pl
import numpy as np
import os 
#import streamlit as st

REP= [
                'anticipazione',
                'causa',
                'commento',
                'conferma',
                'considerazione',
                'contrapposizione',
                'deresponsabilizzazione',
                'descrizione',
                'dichiarazione di intenti',
                'generalizzazione',
                'giudizio',
                'giustificazione',
                'implicazione',
                'non risposta',
                'opinione',
                'possibilità',
                'prescrizione',
                'previsione',
                'proposta',
                'ridimensionamento',
                'sancire',
                'specificazione',
                'valutazione',
                'riferimento all\'obiettivo',
        ]

COLS_ALLOWED = ['Domanda', 'Età', 'Genere', 'Ruolo', 'Testo', 'Stralcio', 'Repertorio', 'Ads']
#cols_dict = dict.fromkeys(FILTER_COLS)

#scorre le colonne del df e aggiorna cols_dict con nome colonne del df e valori unici (x opzioni filtri)
# ritorna errore se non c'è almeno colonna 'Repertorio' e 'Testo'
def clean_df(df):
  check = True
  temp_df = df.loc[:, ~df.columns.str.startswith('Unnamed')]

  temp_df = temp_df.rename(columns=lambda x: x.strip().title())

  if "Testo" not in temp_df.columns:
    raise ValueError("The column \'Testo\' miss in the passed excel file")
  # -> aggiorna attributo num_risposte con num_risposte = len(df['Testo'].unique())
  elif 'Repertorio' not in temp_df.columns:
    raise ValueError("The column \'Repertorio\' miss in the passed excel file")
  elif 'Ads' not in temp_df.columns:
    raise ValueError("The column \'Ads\' miss in the passed excel file")

  # filter the column (self.list_column)
  list_col=[]
  for col in list(temp_df.columns):
    if col in COLS_ALLOWED:
      list_col.append(col)
  new_df = temp_df.loc[:, list_col]

  # funzione aggiorna attributo dizionario nan (da fare self.nan_dict)
  nan_dict = count_nan(new_df)

  #funzione stampa requisiti
  if print_req(nan_dict) == False:
    check = False
    # mostra alert: tutti requisiti soddisfatti

  # add column "num_risposta"
  num_risposta = []
  index = 0
  for i in new_df['Testo'].isna():
    if i == False:
      index = index +1
    num_risposta.append(index)
  new_df['num_risposta'] = num_risposta

  # funzione toglie NaN
  for col in new_df.columns:
    new_df[col].fillna(method='ffill', inplace=True)

  #funzione controlla colonna Domande
  if 'Domanda' in list_col:
    list_domande = list(new_df['Domanda'])
    if check_domande(list_domande) == False:
      check = False
    else:
      #modifico new_df con nuova colonna (funzione che ritorna nuova lista domande con numeri) es: 'Domanda 1'
      new_df['Domanda'] = reform_domande(list_domande)

  #funzione aggiorna dizionario con unique + controlli spelling rep e limite massimo opzioni
  filter_dict={}
  update_filter_dict(new_df, filter_dict)


  # funzione controlla spelling rep confrontando filter_dict con LISTA_REP
  if check_spelling_rep(filter_dict) == False:
    check = False
     # mostra alert repertori scritti correttamente

  if check == True:
    # funz stampa riassunto: file caricato rispetta tutti i requisiti. Si può procedere all'analisi dei testi
    return new_df # self.df = new_df
  else:
    # stampa requisiti mancanti
    raise ValueError('Sono stati riscontrati errori nel formato del file caricato')


def replace_nan_with_previous(column):
    previous_value = None
    for i in range(len(column)):
        if pd.isna(column[i]):
            column[i] = previous_value
        else:
            previous_value = column[i]
    return column

def reform_domande(list_domande):
  domande_formatted = []
  for domande in list_domande:
    domande_formatted.append(f'Domanda {domande[0]}')

  return domande_formatted

def check_domande(list_domande):
  #funzione che scorre la lista passata e verifica che il primo carattere sia un numero
  #print(len(list_domande))
  check = True
  n_error = 0
  for domanda in list_domande:
    if not domanda[0].isdigit():
      #print('in')
      check = False
      n_error += 1
  if check == False:
    print(f'Sono stati trovati {n_error} elementi nella colonna \'Domanda\' senza un numero di riferimento')
  else:
    print('Tutti gli elementi della colonna \'Domanda\' sono preceduti da un numero 👍')
  return check

FILTER_COLS = ['Domanda', 'Età', 'Genere', 'Ruolo', 'Repertorio', 'Ads']
def update_filter_dict(df, filter_dict):
  for col in FILTER_COLS:
    filter_dict[col] = df[col].unique().tolist()

  return filter_dict


def check_spelling_rep(filter_dict):
  if set(filter_dict['Repertorio']) <= set(REP):
    print('Tutti i repertori sono scritti correttamente 👍')
    return True
  print('Sono stati trovati repertori non ammessi. Controllare l\'ortografia')
  return False

def count_nan(df):
  # controlla valori NaN in colonne 'Stralcio' e 'Repertorio' e 'Ads' -> nel caso raise errore miss
  # aggiorna attrib num stralci
  # confronta num Testo con el non NaN delle colonne filtri (eta, genere, ruolo)
  nan_dict = {}
  for col in df.columns:
    if col in ['Stralcio', 'Repertorio', 'Ads']:
      nan_dict[col] = df[col].isna().sum()
    else:
      nan_dict[col] = df['Testo'].notna().sum() - df[col].notna().sum()
  return nan_dict


def print_req(nan_dict):
  if sum(nan_dict.values()) == 0:
    print('Nessuna cella mancante trovata 👍')
    return True
  else:
    for key, value in nan_dict.items():
      if value > 0:
        print(f'Elementi mancanti nella colonna {key}: {value}')
  return False

REP_GENERATIVI = ['descrizione', 'proposta','considerazione', 'anticipazione', 'riferimento all\'obiettivo']
REP_IBRIDI = ['conferma','specificazione','valutazione','possibilità','implicazione']
REP_MANTENIMENTO = ['sancire','causa','opinione','giustificazione']

def df_freq(df, column):
  if column in df.columns:
    dict_col = df[column].value_counts().to_dict()
    new_df = pd.DataFrame(list(dict_col.items()), columns=['Classe', 'Num'])
    new_df['Frequenza'] = ((new_df['Num'] / new_df['Num'].sum()) * 100).round(2)
    return new_df
  else:
    raise ValueError (f'The column \'{column}\' is not in {list(df.columns)}')

def count_rep_group(df):
  dict_rep = df['Repertorio'].value_counts().to_dict()
  # Creazione del nuovo dizionario
  dict_group = {'Generativi': 0, 'Ibridi': 0, 'Mantenimento': 0}

  # Iterazione sul dizionario originale
  for key, value in dict_rep.items():
      if key in REP_GENERATIVI:
        dict_group['Generativi'] += value
      elif key in REP_IBRIDI:
        dict_group['Ibridi']+= value
      elif key in REP_MANTENIMENTO:
        dict_group['Mantenimento'] += value
      else:
        raise ValueError(f"There is an unknown rep: '{key}'")

  new_df = pd.DataFrame(list(dict_group.items()), columns=['Classe', 'Num'])
  new_df['Frequenza'] = ((new_df['Num'] / new_df['Num'].sum()) * 100).round(2)
  return new_df

##################################################################################################################
def prepareDf():
    current_dir = os.path.dirname(os.path.abspath(__file__))  # Percorso della cartella "Graph"
    path = os.path.join(current_dir, "Prova_denominazione.xlsx")
    df = pd.read_excel(path)
    new_df = clean_df(df)
    new_df = new_df.loc[:, ['Domanda', 'Età', 'Genere', 'Ruolo', 'Repertorio', 'Ads', 'num_risposta']]
    new_df=count_rep_group(new_df)
    return new_df
