import React, { useState } from "react";
import Layout from "../../components/Layout";
import TabRisposte from "../../components/TabRisposte";
import TabRisultati from "../../components/TabRisultati";
import "../../../static/css/analisi.css"
import CustomButton from "../../components/CustomButton";
import CircularProgress from "../../components/CircularProgress";
import CustomAlert from "../../components/CustomAlert";



export default function Analisi() {
    const [loading, setLoading] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);
    const [content, setContent] = useState("");
    const [download, setDownload] = useState(false)



    const handleAvviaAnalisi = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAnalyzed(true);
            setContent(<TabRisultati />); // Da cambiare con componente risultati analisi
        }, 8000);
    }

    const handleScaricaDataset = () => {
       
        const fileUrl = '/files/example.pdf';       //file letto da DB
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'example.pdf'; // Salvato con NomeAss_data.xlsx
        link.click();
        setDownload(true);

    };

    return (
        <Layout
            title="[Name_ass]"
            spallasx={<p>Contenuto spalla sinistra</p>}
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
                            <div className="div-alert-download">
                                {download && (
                                    <CustomAlert text='Download completato' />
                                )}

                            </div>
                        </div>

                    )}

                    <div className="row3">
                        <div className="">
                            <h2>Row 3</h2>
                        </div>

                    </div>
                    <div className="row4">
                        <div className="">
                            <h2>Row 4</h2>
                        </div>

                    </div>

                </ div>

            }

        />
    );
}