import React from "react";
import Layout from "../../components/Layout";
import TabellaRisposte from "../../components/TabellaRisposte";

export default function Analisi() {
    return (
        <Layout
            title="[Name_ass]"
            spallasx={<p>Contenuto spalla sinistra</p>}
            main={
                <div className="div-table">
                    <TabellaRisposte time='4' ></TabellaRisposte>
                </div>
            }

        />
    );
}