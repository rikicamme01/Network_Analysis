from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
import os
import pandas as pd
from django.conf import settings
import openpyxl
from openpyxl.styles import Font, Alignment
import uuid


class GoogleForm:
    @staticmethod
    def _build_form_service():
        SCOPES = [
            "https://www.googleapis.com/auth/forms.body",
            "https://www.googleapis.com/auth/forms.responses.readonly",
        ]
        DISCOVERY_DOC = "https://forms.googleapis.com/$discovery/rest?version=v1"

        credentials_path = os.path.join(settings.BASE_DIR, "credentials.json")
        if not os.path.exists(credentials_path):
            raise FileNotFoundError(f"File delle credenziali non trovato in: {credentials_path}")

        creds = Credentials.from_service_account_file(credentials_path, scopes=SCOPES)
        form_service = build(
            "forms",
            "v1",
            credentials=creds,
            discoveryServiceUrl=DISCOVERY_DOC,
            static_discovery=False,
        )
        return creds, form_service



    def __init__(self, title, description=""):
        self.creds, self.form_service = self._build_form_service()
        self.title = title

        form_metadata = {
            'info': {
                'title': title
            }
        }

        self.result = self.form_service.forms().create(body=form_metadata).execute()
        self.form_id = self.result['formId']
        self.title = self.result['info']['title']
        self.uri = self.result['responderUri']
        self.tot_responses = 0
        self.question_map = []

        self.set_description(description)

    @classmethod
    def from_form_id(cls, form_id):
        creds, form_service = cls._build_form_service()
        metadata = form_service.forms().get(formId=form_id).execute()
        
        obj = cls.__new__(cls)  # Bypassa __init__
        obj.creds = creds
        obj.form_service = form_service
        obj.form_id = form_id
        obj.title = metadata.get("info", {}).get("title", "")
        obj.uri = metadata.get("responderUri", "")
        obj.tot_responses = 0
        obj.question_map = []

        return obj


    def set_description(self, description):
        update_description = {
            "updateFormInfo": {
                "info": {
                    "description": description
                },
                "updateMask": "description"
            }
        }
        self.form_service.forms().batchUpdate(
            formId=self.form_id,
            body={'requests': [update_description]}
        ).execute()

    def add_questions(self, question_requests: list):
        """Adds a list of question 'requests' in Forms API format"""
        if question_requests:
            self.form_service.forms().batchUpdate(
                formId=self.form_id, body={'requests': question_requests}).execute()

    def add_sections(self, sections):
        self.form_service.forms().batchUpdate(
            formId=self.form_id, body=sections).execute()
        form = self.form_service.forms().get(formId=self.form_id).execute()
        items = form['items']
        return [item['itemId'] for item in items if 'pageBreakItem' in item]

    def update_question_map(self):
        get_info = self.form_service.forms().get(formId=self.form_id).execute()
        self.question_map = {}

        for item in get_info.get("items", []):
            if 'questionItem' in item:
                question = item['questionItem']['question']
                question_id = question.get('questionId')
                question_text = item.get('title')
                if question_id and question_text:
                    self.question_map[question_id] = question_text


    def set_tot_responses(self):
        responses = self.form_service.forms().responses().list(formId=self.form_id).execute()
        if responses:
            self.tot_responses = len(responses.get('responses', []))
        else:
            self.tot_responses = 0

    def get_resp_for_number(self, question_index):
        responses = self.form_service.forms().responses().list(formId=self.form_id).execute()
        resp_list = []
        if 'responses' in responses:  # Verifica se ci sono risposte
            for response in responses['responses']:
                for all_answer in response.get('answers', {}).values():
                    if all_answer['questionId'] == self.question_map[question_index]:
                        resp_list.append(
                            all_answer['textAnswers']['answers'][0]['value']
                        )
        return resp_list

    def get_all_responses(self):
        responses = []
        page_token = None

        while True:
            response = self.form_service.forms().responses().list(
                formId=self.form_id,
                pageToken=page_token
            ).execute()

            responses.extend(response.get('responses', []))
            page_token = response.get('nextPageToken')

            if not page_token:
                break

        self.tot_responses = len(responses)
        return responses
    

    def format_excel_sheet(self, worksheet):
        # Imposta la larghezza delle colonne in base alla lunghezza del titolo della colonna
        for col in worksheet.columns:
            column = col[0].column_letter  # Ottieni la lettera della colonna
            
            # Verifica se la colonna è 'Domanda' o 'Testo' e assegna una larghezza fissa di 30
            if column == 'D' or column == 'E':  # Supponiamo che "Domanda" e "Testo" siano le colonne D ed E
                max_length = 30  # Imposta larghezza fissa per Domanda e Testo
            else:
                max_length = len(str(col[0].value))  # Usa la lunghezza del titolo per le altre colonne

            adjusted_width = (max_length + 2)  # Un po' di spazio extra
            worksheet.column_dimensions[column].width = adjusted_width

        # Imposta il font per la prima riga (titoli delle colonne)
        for cell in worksheet[1]: 
            cell.font = Font(size=12, bold=True)  # Imposta il font del titolo
            cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)  # Allineamento e wrap text

        # Colore di sfondo per le intestazioni delle colonne
        for cell in worksheet[1]:  # Titoli delle colonne
            cell.fill = openpyxl.styles.PatternFill(start_color="D9EAD3", end_color="D9EAD3", fill_type="solid")  # Colore di sfondo

        # Allineamento a sinistra e in alto per i dati nelle righe successive ai titoli
        for row in worksheet.iter_rows(min_row=2):  # Inizia dalla seconda riga (i dati)
            for cell in row:
                cell.alignment = Alignment(horizontal="left", vertical="top", wrap_text=True)  # Allineamento a sinistra e in alto


    def export_responses(self, output_dir=None):
        try:
            responses = self.get_all_responses()

            # Verifica le risposte
            if not responses:
                print("Nessuna risposta trovata.")
                return None, None

            if not self.question_map:
                self.build_question_map()

            data = []
            for r in responses:
                row = {}
                for qid, answer_obj in r.get("answers", {}).items():
                    question_text = self.question_map.get(qid, qid)
                    text_answers = answer_obj.get("textAnswers", {}).get("answers", [])
                    # Gestisci risposte multiple
                    row[question_text] = "; ".join([a.get("value", "") for a in text_answers])
                data.append(row)

            if not data:
                print("Dati vuoti dopo l'elaborazione.")
                return None, None

            df = pd.DataFrame(data)

            # Gestisci NaN e inf nei DataFrame sostituendo con ""
            df = df.applymap(lambda x: "" if isinstance(x, float) and (pd.isna(x) or x == float('inf') or x == -float('inf')) else x)

            df = df[sorted(df.columns)]  # Ordina le colonne in ordine alfabetico
            df.columns = df.columns.str.strip()

            # Crea una lista vuota per contenere le righe riformattate
            rows = []

            domande = [
                '6.A Descrivi almeno 3 punti deboli riscontrati nell’organizzazione in cui operi rispetto alla gestione di "Gender Gap"',
                '6.B Descrivi almeno 3 punti di forza riscontrati nell’organizzazione in cui operi rispetto alla gestione di "Gender Gap"',
                '6.C Considerando le tue precedenti risposte, quale apporto potrebbe dare il tuo ruolo per affrontare/migliorare "Gender Gap" all’interno dell’organizzazione?',
                '6.D Quali sono gli ostacoli anticipati rispetto all’effettiva possibilità di dare il tuo apporto alla gestione di "Gender Gap", nel ruolo che tu ricopri?',
                '6.E Quali strategie potresti adottare, nel ruolo che ricopri, per affrontare tali ostacoli?'
            ]

            for _, row in df.iterrows():
                for domanda in domande:
                    # Crea una nuova riga con i valori duplicati per Età, Genere, Ruolo
                    new_row = {
                        '1.A Età': row['1.A Età'],
                        '1.B Genere': row['1.B Genere'],
                        '2.A Ruolo ricoperto all\'interno dell\'organizzazione': row['2.A Ruolo ricoperto all\'interno dell\'organizzazione'],
                        'Domanda': domanda,
                        'Testo': row[domanda]
                    }
                    rows.append(new_row)

            df_riformattato = pd.DataFrame(rows)

            # Gestisci NaN e inf nei DataFrame riformattati sostituendo con ""
            df_riformattato = df_riformattato.applymap(lambda x: "" if isinstance(x, float) and (pd.isna(x) or x == float('inf') or x == -float('inf')) else x)

            return df, df_riformattato

        except Exception as e:
            # Log dell'errore
            print(f"Errore durante l'esportazione: {e}")
            return None, None


