import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import TabAssessment from "../../components/TabAssessment";

export default function DatabaseAss() {
    const navigate = useNavigate();

    const handleSelection = (params) => {

        // Passa i dati alla Dashboard.js attraverso lo stato di navigazione
        navigate('/dashboard', { state: { selectedAssessment: params.row } });
    };

    return (
        <Layout
            title="Lista assessment"
            main={<TabAssessment handleSelection={handleSelection} />}
        />
    );
}
