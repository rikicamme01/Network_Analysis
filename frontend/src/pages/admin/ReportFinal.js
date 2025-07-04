import React, { useState } from "react";
import Layout from "../../components/Layout";
import FasiAdmin from "../../components/FasiAdmin";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert";

import "../../../static/css/reportFinal.css";


export default function ReportFinal() {
    const [showAlert, setShowAlert] = useState(false);

    const handleDownload = () => {
        const fileUrl = 'http://localhost:8000/static/Report_user_RETI.pdf';       //file letto da DB
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'Report_Assessment_Good_Times.pdf';
        link.click();

        setShowAlert(true);
        setTimeout(() => { // Simula salvataggio su DB o altra logica
            setShowAlert(false);
        }, 3000);

    }

    const handlePrenotaConsulenza = () => {
        const email = "ricerca@dialogica-lab.eu";
        const subject = encodeURIComponent("Oggetto"); // Codifica l'oggetto
        const body = encodeURIComponent("Questo è il testo della mail preimpostata per prenotare una consulenza."); // Codifica il corpo della mail

        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;

        //const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${subject}&body=${body}`;

        //window.open(gmailLink, "_blank");
    }
    return (
        <Layout
            title="Assessment X"
            spallasx={<FasiAdmin status={[2, 2, 2]} />}
            main={
                <div className="div-genitore-report">
                    <div className="div-row">
                        <div className="div-button">
                            <CustomButton
                                text='Scarica in pdf'
                                onClick={handleDownload}
                            />
                        </div>
                        <div className={`alert-message fade-alert ${!showAlert ? "hidden" : ""}`}>
                            {showAlert && <CustomAlert text="Download completato" />}
                        </div>

                    </div>
                    <div className="div-row">
                        <div className="div-button">
                            <CustomButton
                                text='Prenota consulenza'
                                onClick={handlePrenotaConsulenza}
                            />

                        </div>

                    </div>


                </div>

            }
        />
    );
}