import string
import re
from sklearn import preprocessing

LABELS = [
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
                'riferimento all\'obiettivo'
        ]

def find_word_bounds(spans: list, text: str) -> list:
    '''
    Given a list of spans and a text, find the start and end indices of each span in the text.
    Indeces are computed counting WORDS.

    :param spans: a list of strings, each string is a span of text
    :type spans: list
    :param text: the text to be searched
    :type text: str
    :return: A list of tuples, where each tuple is the start and end index of a word in the text.
    '''
    bounds = []
    end = 0
    for span in spans:
        s = span.translate(str.maketrans('', '', string.punctuation))
        word_list = s.split()
        if word_list:   
            text_list = text.translate(str.maketrans('', '', string.punctuation)).split()
            try:
                start = text_list.index(word_list[0], end)
            except:
                if not bounds:
                    start = 0
                else:

                    start = bounds[-1][1] + 1
            end = start + len(word_list) - 1

            bounds.append((start, end))
    return bounds


def clean_text(text:str) -> str:
    #delete \n
    text = text.replace('\n', ' ')
    #text = text.rstrip('\n')
    text = text.rstrip()
    #delete double punctuation
    text =  re.sub(r'[\?\.\!]+(?=[\?\.\!])', '', text)
    # add space between a word and punctuation
    #text = re.sub('(?<! )(?=[.,!?()])|(?<=[.,!?()])(?! )', r' ', text)    
    return text

def decode_labels(encoded_labels):
    le = preprocessing.LabelEncoder()
    le.fit(LABELS)
    return le.inverse_transform(encoded_labels)

def decode_labels_vector(probabilities):
    dict_per_stralci = []
    for prob in probabilities:
        if len(prob) != len(LABELS):
            raise ValueError(f"Le liste delle chiavi e dei valori devono avere la stessa lunghezza: {len(prob)},{len(LABELS)}")
        dict_per_stralci.append(dict(zip(LABELS, prob)))  
    return dict_per_stralci