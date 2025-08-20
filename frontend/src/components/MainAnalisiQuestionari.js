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

        export_responses()
            .then((response) => {
                if (response && response.data) {
                    const formattedResponsesData = response.data.formatted_responses_data;
                    responsesData = response.data.responses_data;

                    if (formattedResponsesData) {
                        console.log("Dati delle risposte riformattate:", formattedResponsesData);
                        console.log("ResponsesData ottenuti:", responsesData);

                        const onlyTesto = formattedResponsesData.map((row) => ({ Testo: row.Testo }));

                        // ✅ RESTITUISCE LA PROMISE QUI
                        return ml_analyzer(onlyTesto, formattedResponsesData);
                    } else {
                        throw new Error('Dati delle risposte riformattate non trovati');
                    }
                } else {
                    throw new Error('Errore nella risposta di export_responses');
                }
            })
            .then((result) => {
                // ORA result contiene i dati restituiti da ml_analyzer
                formattedResponsesAnalyzed = result;

                console.log("Analisi completata!");
                console.log("responsesData:", responsesData);
                console.log("formattedResponsesAnalyzed:", formattedResponsesAnalyzed);

                setLoading(false);
                setAnalyzed(true);
            })
            .catch((error) => {
                setLoading(false);
                console.error('Errore durante l\'analisi:', error);
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

    const ml_analyzer = async (testoOnlyData, formattedResponsesData) => {
        // invia la richiesta api con solo la colonna "Testo" di formattedResponsesData
        console.log("Dati da inviare a ml_analyzer (only Testo):", testoOnlyData);

        try {
            const response = await AxiosInstance.post('/api/ml_analyzer/ml_predict/',
                { df: testoOnlyData },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response?.status !== 200) {
                console.error('Risposta non 200 da ml_analyzer:', response.status);
                throw new Error(`Errore HTTP ${response.status}`);
            }
            if (!response.data || !response.data.modified_responses_data) {
                console.error('Risposta non valida da ml_analyzer:', response.data);
                throw new Error('Risposta vuota o dati mancanti dal server di analisi');
            }
            const modifiedData = response.data?.modified_responses_data;
            if (!modifiedData) {
                throw new Error('Risposta vuota o dati mancanti dal server di analisi');
            }

            console.log('Risultato elaborato da ml_analyzer:', response.data.modified_responses_data);

            const combinedData = formattedResponsesData.map((row, index) => ({
                ...row,
                ...modifiedData[index],
            }));

            return combinedData;

        } catch (error) {
            console.error('Errore durante la chiamata a ml_analyzer:', error);

            const status = error?.response?.status || 'N/A';
            const errorMessage =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                'Errore sconosciuto';

            if (error?.response) {
                console.error('Dettagli errore ml_analyzer:', error?.response?.data);
                throw new Error(`Errore ML Analyzer (${status}): ${errorMessage}`);
            } else if (error?.request) {
                console.error('Errore nella richiesta ml_analyzer:', error?.request);
                throw new Error('Errore di rete: il server non è raggiungibile. Verifica che sia attivo.');
            } else {
                console.error('Errore Axios generico:', error?.message || error);
                throw new Error(`Errore Axios: ${errorMessage}`);
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
