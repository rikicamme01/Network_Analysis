import React, { useState, useEffect } from "react";
import TabFrequenza from "../../components/mainGrafici/TabFrequenza"
import CustomButton from "../CustomButton";

export default function IndiceCoesione() {

    return (
        <div className="div-genitore-graph">
            <div className="div-title-graph">
                <div>
                    <p className="title-graph">Indice di coesione</p>
                </div>
                <div className="div-filtro">
                    <CustomButton
                        text="Filtro"
                        width="120px"
                    />
                </div>
            </div>
            <div className="div-tab-graph">
                <div className="index">
                    <p>Indice di coesione</p>
                </div>
                <div className="graph">
                    <img className="graph-img scale" src="../../../static/img/graph/Indice_coesione.png" alt="Graph_Distribuzione_RDxGruppo" />
                </div>
            </div>
            <div className="div-tab-graph">
                <div className="index">
                    <p>Analisi del contesto</p>
                </div>
                <div className="graph">
                    <img className="graph-img scale" src="../../../static/img/graph/Analisi_contesto.png" alt="Graph_Distribuzione_RDxGruppo" />
                </div>
            </div>
            <div className="div-tab-graph">
                <div className="index">
                    <p>Anticipazione</p>
                </div>
                <div className="graph">
                    <img className="graph-img scale" src="../../../static/img/graph/Anticipazione.png" alt="Graph_Distribuzione_RDxGruppo" />
                </div>
            </div>
            <div className="div-tab-graph">
                <div className="index">
                    <p>Gestione</p>
                </div>
                <div className="graph">
                    <img className="graph-img scale" src="../../../static/img/graph/Gestione.png" alt="Graph_Distribuzione_RDxGruppo" />
                </div>
            </div>
        </div>
    );
}
