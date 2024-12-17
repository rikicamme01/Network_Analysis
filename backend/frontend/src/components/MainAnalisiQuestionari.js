import React, { useState } from "react";
import "../../static/css/analisiQuestionari.css"
import TabRisultati from "./TabRisultati";
import TabStatus from "./TabStatus";
import CustomButton from "./CustomButton";
import CircularProgress from "./CircularProgress";
import CustomAlert from "./CustomAlert";
import FileInput from "./FileInput";
import { useOutput } from "./Context";



export default function MainAnalisiQuestionari() {
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

    const handleAvviaAnalisi = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAnalyzed(true);
            setContent(<TabRisultati rows={rows} />); // Da cambiare con componente risultati analisi
        }, 8000);
        //aggiorna stato DB
    };

    const handleScaricaDataset = () => {
        const fileUrl = 'http://localhost:8000/static/test.xlsx';       //file letto da DB
        ///Users/riccardo/Desktop/Network_Analysis/Network_Analysis/backend/frontend/src/components/test.xlsx

        const currentDate = new Date();
        const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}_${String(currentDate.getMonth() + 1).padStart(2, '0')}_${String(currentDate.getFullYear()).slice(-2)}`;
        const fileName = `dataset_Assessment_A_${formattedDate}.xlsx`;

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
                    <TabStatus time='4' ></TabStatus>
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
            {download && (
                <div className="row3">
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

                </div>)}
        </div>
    );
}
