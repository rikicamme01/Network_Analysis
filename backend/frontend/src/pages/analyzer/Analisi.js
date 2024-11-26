import React, { useState } from "react";
import Layout from "../../components/Layout";
import TabRisposte from "../../components/TabRisposte";
import TabRisultati from "../../components/TabRisultati";
import "../../../static/css/analisi.css"
import CustomButton from "../../components/CustomButton";
import CircularProgress from "../../components/CircularProgress";
import CustomAlert from "../../components/CustomAlert";
import FileInput from "../../components/FileInput";
import NastedListMenu from "../../components/NestedListMenu";



export default function Analisi() {
    const [main, setMain] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [loading, setLoading] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);
    const [content, setContent] = useState("");
    const [download, setDownload] = useState(false);
    const [output, setOutput] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formatError, setFormatError] = useState(false)


    const handleAvviaAnalisi = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAnalyzed(true);
            setContent(<TabRisultati />); // Da cambiare con componente risultati analisi
        }, 8000);
        //aggiorna stato DB
    }

    const handleScaricaDataset = () => {

        const fileUrl = '/files/example.pdf';       //file letto da DB
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'example.pdf'; // Salvato con NomeAss_data.xlsx
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

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        console.log(selectedIndex);
    }

    return (
        <Layout
            title="[Name_ass]"
            spallasx={<NastedListMenu selectedIndex={selectedIndex} handleListItemClick={handleListItemClick}></NastedListMenu>} //da aggiungere pulsante indietro
            main={
                <div className="frame">
                    <div className="row1">
                        <div className="row1-table">
                            <TabRisposte time='4' ></TabRisposte>
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

            }

        />
    );
}