import React from "react";
import Layout from "../../components/Layout";
import TabAssessment from "../../components/TabAssessment";

export default function DatabaseAss() {

    const handleSelection = (row) => {
        console.log(row)
    }

    return (
        <Layout
            title="Lista assessment"
            main={<TabAssessment handleSelection={handleSelection} />}

        />
    );
}