import React, { useState, useEffect } from "react";
import "../../static/css/analisiQuestionari.css"
import TabRisultati from "./TabRisultati";
import TabStatus from "./TabStatus";
import TabStatus100 from "./TabStatus100";
import CustomButton from "./CustomButton";
import CircularProgress from "./CircularProgress";
import CustomAlert from "./CustomAlert";
import FileInput from "./FileInput";
import { useOutput } from "./Context";
import AxiosInstance from "../Axios";



export default function MainAnalisiQuestionari({ selectedAssessment }) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);
    const [download, setDownload] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formatError, setFormatError] = useState(false);
    const { output, setOutput } = useOutput();

    function createData(type, numbers,) {
        return { type, numbers };
    }

    const rows = [
        createData('N° Risposte', 248),
        createData('N° Stralci', 673),
        createData('N° RD da revisionare', 65),
    ];
    // Dichiara le variabili a livello di componente/modulo
    let formattedResponsesAnalyzed = null;
    let responsesData = null;

    const handleAvviaAnalisi = () => {
        console.log("Assessment selezionato:", selectedAssessment);
        setLoading(true);

        // Chiamata a export_responses per ottenere i dati
        export_responses()
            .then((response) => {
                if (response && response.data) {
                    const formattedResponsesData = response.data.formatted_responses_data;
                    responsesData = response.data.responses_data;

                    if (formattedResponsesData) {
                        console.log("Dati delle risposte riformattate:", formattedResponsesData);
                        console.log("ResponsesData ottenuti:", responsesData);

                        // Dopo aver ottenuto i dati, chiama ml_analyzer passando i dati ottenuti
                        return ml_analyzer(formattedResponsesData);
                    } else {
                        console.error('I dati delle risposte riformattate non sono stati trovati');
                        throw new Error('Dati delle risposte riformattate non trovati');
                    }
                } else {
                    console.error('Errore nella risposta di export_responses');
                    throw new Error('Errore nella risposta di export_responses');
                }
            })
            .then((result) => {
                // Assegna formattedResponsesAnalyzed DENTRO il flusso delle promesse
                formattedResponsesAnalyzed = result;

                // Ora entrambe le variabili sono disponibili e sincronizzate
                console.log("Analisi completata!");
                console.log("responsesData:", responsesData);
                console.log("formattedResponsesAnalyzed:", formattedResponsesAnalyzed);

                // Qui puoi chiamare la funzione per creare l'Excel o fare altre operazioni
                //createExcelFile(responsesData, formattedResponsesAnalyzed);

                setLoading(false);
                setAnalyzed(true);

                // Se devi settare il content, fallo qui
                // setContent(<TabRisultati rows={formattedResponsesAnalyzed} />);
            })
            .catch((error) => {
                // Gestisci eventuali errori
                setLoading(false);
                console.error('Errore durante l\'analisi:', error);

                // Reset delle variabili in caso di errore
                formattedResponsesAnalyzed = null;
                responsesData = null;
            });
    };

    const export_responses = async () => {
        if (!selectedAssessment || !selectedAssessment['_id']) {
            console.error("Assessment non selezionato o ID non valido");
            throw new Error("Assessment non selezionato o ID non valido");
        }

        try {
            const response = await AxiosInstance.get('/api/forms/export_google_form_responses/', {
                params: {
                    assessment_id: selectedAssessment['_id'],
                },
            });

            console.log('Export completato:', response.data);
            return response;

        } catch (error) {
            console.error('Errore durante l\'export:', error);

            // Gestione più sicura degli errori
            if (error.response && error.response.status) {
                console.error('Dettagli errore response:', error.response.data);
                const errorMessage = error.response.data?.message || error.response.data?.error || 'Errore sconosciuto dal server';
                throw new Error(`Errore server: ${error.response.status} - ${errorMessage}`);
            } else if (error.request) {
                console.error('Errore nella richiesta:', error.request);
                throw new Error('Errore di connessione: il server non è raggiungibile. Verifica che il server Django sia in esecuzione.');
            } else if (error.code === 'ERR_NETWORK') {
                throw new Error('Errore di rete: impossibile connettersi al server. Verifica la connessione.');
            } else {
                console.error('Errore sconosciuto:', error.message);
                throw new Error(`Errore sconosciuto: ${error.message || 'Errore non specificato'}`);
            }
        }
    };

    const ml_analyzer = async (formattedResponsesData) => {
        console.log("Dati da inviare a ml_analyzer:", formattedResponsesData);
        try {
            const response = await AxiosInstance.post('/api/ml_analyzer/ml_predict/', {
                df: formattedResponsesData
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response && response.data) {
                console.log('Risultato elaborato da ml_analyzer:', response.data.modified_responses_data);
                return response.data.modified_responses_data;
            } else {
                console.error('Risposta vuota da ml_analyzer');
                throw new Error('Risposta vuota dal server di analisi');
            }

        } catch (error) {
            console.error('Errore durante la chiamata a ml_analyzer:', error);

            // Gestione più sicura degli errori
            if (error.response) {
                // Controlla se la risposta esiste e ha un status
                console.error('Dettagli errore ml_analyzer:', error.response.data);
                const errorMessage = error.response.data?.error || error.response.data?.message || 'Errore sconosciuto dal server';
                throw new Error(`Errore nell'analisi ML: ${error.response.status} - ${errorMessage}`);
            } else if (error.request) {
                // Errore di rete (server non raggiungibile)
                console.error('Errore nella richiesta ml_analyzer:', error.request);
                throw new Error('Errore di connessione: il server non è raggiungibile. Verifica che il server Django sia in esecuzione.');
            } else {
                // Altri errori
                console.error('Errore sconosciuto ml_analyzer:', error.message);
                throw new Error(`Errore nell'analisi ML: ${error.message || 'Errore sconosciuto'}`);
            }
        }
    };

    const createExcelFile = (responsesData, formattedResponsesAnalyzed) => {
        console.log("Creazione file Excel con:");
        console.log("- responsesData:", responsesData);
        console.log("- formattedResponsesAnalyzed:", formattedResponsesAnalyzed);

        // Qui puoi implementare la logica per creare il file Excel
        // usando entrambi i dataset che ora sono disponibili e sincronizzati
    };

    // Funzione di utility per verificare se i dati sono disponibili
    const isDataReady = () => {
        return responsesData !== null && formattedResponsesAnalyzed !== null;
    };

    // Funzione per resettare i dati
    const resetAnalysisData = () => {
        formattedResponsesAnalyzed = null;
        responsesData = null;
    };


    const handleScaricaDataset = () => {        // scarica in locale il file excel finale prodotto da ml_analyzer
        const fileUrl = 'http://localhost:8000/static/Dataset_Assessment_X.xlsx';       //file letto da DB
        ///Users/riccardo/Desktop/Network_Analysis/Network_Analysis/backend/frontend/src/components/test.xlsx

        const currentDate = new Date();
        const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}_${String(currentDate.getMonth() + 1).padStart(2, '0')}_${String(currentDate.getFullYear()).slice(-2)}`;
        const fileName = `Dataset_Assessment_X_${formattedDate}.xlsx`;

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName; // Salvato con NomeAss_data.xlsx
        link.click();
        setDownload(true);

        //aggiorna stato DB
    };

    const handleValueChange = (file, error) => {
        setSelectedFile(file);
        setFormatError(error);
        setOutput(false);
    };

    const handleGeneraOutput = () => {
        setOutput(true);
        console.log(selectedFile);
    };

    return (
        <div className="frame">
            <div className="row1">
                <div className="row1-table">
                    <TabStatus100 time='7' ></TabStatus100>
                </div>
                <div className="row1-dx">
                    <div className="div-button-analisi">
                        {analyzed ? (
                            <CustomAlert text="Analisi completata" />
                        ) : (
                            < CustomButton
                                text='Avvia analisi'
                                onClick={handleAvviaAnalisi}
                                disabled={loading}
                            />
                        )}
                    </div>
                    <div className="div-res-gif">
                        {loading ? (
                            <CircularProgress></CircularProgress>
                        ) : (
                            <div>{content}</div>
                        )}
                    </div>

                </div>

            </div>

            {analyzed && (
                <div className="row2">
                    <div className="div-button-download">
                        <CustomButton
                            text='Scarica dataset'
                            onClick={handleScaricaDataset}
                        />
                    </div>
                    <div className="div-alert">
                        {download && (
                            <CustomAlert text='Download completato' />
                        )}

                    </div>
                </div>

            )}
            {//download //&& (
                /*<div className="row3">
                    <div className="div-inputFile">
                        <FileInput handleValueChange={handleValueChange} error={formatError} ></FileInput>
    
                    </div>
                    <div className="div-button-output">
                        {output ? (
                            <CustomAlert text='Grafici generati' />  //Grafici output
                        ) : (
                            <CustomButton
                                text='Genera grafici' // Genera output
                                onClick={handleGeneraOutput}
                                disabled={selectedFile === null}
                            />
    
                        )}
                    </div>
    
                </div>*/

                //)
            }

        </div>
    );
}
