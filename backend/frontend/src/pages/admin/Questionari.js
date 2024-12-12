import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import FasiAdmin from "../../components/FasiAdmin";
import CustomAlert from "../../components/CustomAlert";
import CustomButton from "../../components/CustomButton";
import TabStatus from "../../components/TabStatus";

import "../../../static/css/questionari.css"

export default function Questionari() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const linkSurvey = "https://docs.google.com/forms/d/e/1FAIpQLSe6GHyT4THAf3k7QPFqPBiMlVvlx8-KarTI4eBWwYSQhO96zA/viewform"


    const handleCopia = (link) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(link)
                .then(() => {
                    console.log("Link copiato negli appunti!");
                    setShowAlert(true);
                    setTimeout(() => { // Simula salvataggio su DB o altra logica
                        setShowAlert(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.error("Errore nella copia del link:", error);
                    alert("Impossibile copiare il link negli appunti.");
                });
        } else {
            alert("La funzione copia non è supportata dal browser.");
        }
    };

    const handleShare = () => {
        //const email = "destinatario@example.com";
        const subject = encodeURIComponent("ogg"); // Codifica l'oggetto
        const body = encodeURIComponent("Questo è il testo della mail preimpostata."); // Codifica il corpo della mail

        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;

        //const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${subject}&body=${body}`;

        //window.open(gmailLink, "_blank");
    };

    const handleForward = () => {
        navigate("/reportLoading")
    };


    return (
        <Layout
            title="Assessment A"
            spallasx={<FasiAdmin status={[2, 1, 0]} />}
            main={
                <div className="div-genitore">
                    <div className="div-testo">
                        Grazie per aver risposto alle nostre domande. Le tue risposte sono state impiegate per personalizzare il questionario di indagine. Di seguito trovi il link da inviare ai ruoli della tua realtà organizzativa che vuoi coivolgere nell’indagine. La somministrazione si concluderà entro il [dd/mm/yyyy] Qui sotto potrai monitorare l’andamento della somministrazione.
                        Una volta conclusa la somministrazione, si avvierà l’analisi dei dati raccolti.
                    </div>
                    <div className="div-condividi">
                        <CustomButton
                            text='Condividi tramite mail'
                            onClick={handleShare}
                        />
                    </div>
                    <div className="div-button-alert">
                        <div className="div-button">
                            <CustomButton
                                text='Copia link'
                                onClick={() => handleCopia(linkSurvey)}
                            />
                        </div>
                        <div className={`alert-message fade-alert ${!showAlert ? "hidden" : ""}`}>
                            {showAlert && <CustomAlert text="Link copiato" />}
                        </div>
                    </div>

                    <div className="div-tab-status">
                        <TabStatus time='4' />

                    </div>
                    <div>
                        <CustomButton
                            text="avanti"
                            onClick={handleForward}
                        />

                    </div>
                </div>
            }
        />
    );
}