import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import TabAssessment from "../../components/TabAssessment";

export default function DatabaseAss() {
    const navigate = useNavigate();

    const handleSelection = (params) => {
        // Quando si preme due volte su una riga, stampa i dati della riga
        console.log('Dati della riga:', params.row);
        navigate('/dashboard');
    };
    return (
        <Layout
            title="Lista assessment"
            main={<TabAssessment handleSelection={handleSelection} />}

        />
    );
}