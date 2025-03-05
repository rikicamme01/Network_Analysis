import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from 'lottie-react';
import Layout from "../../components/Layout";
import FasiAdmin from "../../components/FasiAdmin";
import TabStatus from "../../components/TabStatus";
import TabStatus100 from "../../components/TabStatus100";
import CustomButton from "../../components/CustomButton";
import loadingAnimation from "../../../static/img/Animation - 1733397016244.json";

import "../../../static/css/reportLoading.css"

export default function ReportLoading() {
    const navigate = useNavigate();
    const handleForward = () => {
        navigate("/reportFinal")
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/reportFinal");
        }, 10000); // 10 secondi (10000 ms)

        // Pulizia del timer se il componente viene smontato
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Layout
            title="Assessment X"
            spallasx={<FasiAdmin status={[2, 2, 1]} />}
            main={
                <div className="div-genitore-load">
                    <div className="div-testo">
                        I questionari sono stati compilati!<br />
                        Stiamo procedendo con l’analisi dei dati. Ti avviseremo via mail della conclusione dell’analisi: potrai visionare e scaricare il report d’indagine in questa schermata.
                    </div>
                    <div className="div-gif"
                        style={{ textAlign: 'center', }}>
                        <Lottie className="gif" animationData={loadingAnimation} style={{ width: 400, height: 400 }} />
                    </div>
                    <div className="div-tab-status">
                        <TabStatus100 time='7' />
                    </div>

                </div>
            }
        />

    );
}
/*
<div>
                        <CustomButton
                            text="avanti"
                            onClick={handleForward}
                            style={{ marginTop: "40px" }}
                        />

                    </div>
*/