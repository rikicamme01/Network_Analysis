import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import FasiAdmin from "../../components/FasiAdmin";
import CustomAlert from "../../components/CustomAlert";
import CustomButton from "../../components/CustomButton";
import TabStatus from "../../components/TabStatus";
import AxiosInstance from '../../Axios'

import "../../../static/css/questionari.css"

export default function Questionari() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [assessmentName, setAssessmentName] = useState("");
    const [linkSurvey, setLinkSurvey] = useState("");


    useEffect(() => {
        const fetchLinkSurvey = async () => {
            try {
                const response = await AxiosInstance.get("/api/get_assessmentName/");
                setAssessmentName(response.data.assessmentName);
            } catch (error) {
                console.error("Errore durante il recupero del titolo del questionario:", error);
            }

            try {
                const response = await AxiosInstance.get("/api/get_surveyLink/");
                setLinkSurvey(response.data.google_form_url);

            } catch (error) {
                if (error.response?.status === 400) {
                    console.warn("Il link non è ancora stato generato.");
                    setLinkSurvey(null); // oppure mostra un messaggio all'utente
                } else {
                    console.error("Errore imprevisto:", error);
                }
            }
        };

        fetchLinkSurvey();
    }, []);

    const handleCopia = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(linkSurvey)
                .then(() => {
                    console.log("Link copiato negli appunti!");
                    setShowAlert(true);
                    setTimeout(() => {
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
        const subject = encodeURIComponent("Oggetto"); // Codifica l'oggetto
        const body = encodeURIComponent(
            `Carissimi,\n\nvi invitiamo a partecipare a un’indagine interna rispondendo al questionario disponibile al seguente\nlink: ${linkSurvey}.\n\nIl questionario, parte dello strumento Network Cohesion Index, è progettato per rilevare il grado di coesione rispetto a [specificare tematica]. A partire dai dati emersi grazie al vostro contributo, potremo tracciare traiettorie di sviluppo della nostra organizzazione che partano dalle nostre esigenze.\nL’indagine è rivolta a ruoli diversi, così da raccogliere prospettive molteplici e offrire una visione dinamica e multidimensionale sul tema.\n\nIl questionario è anonimo e contiene domande sia aperte che chiuse. I dati saranno trattati nel rispetto delle normative sulla privacy (Dlgs.n.101/2018).\n\n
Per qualsiasi domanda relativa all’indagine, potete contattare ricerca@dialogica-lab.eu, il team di ricerca sarà lieto di rispondere.\n\n
Grazie per la collaborazione!\n\n
Un caro saluto.`
        );

        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;

    };

    const handleForward = () => {
        navigate("/reportLoading")
    };

    return (
        <Layout
            title={assessmentName}
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

                </div>
            }
        />
    );
}