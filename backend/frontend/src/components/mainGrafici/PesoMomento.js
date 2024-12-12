import React, { useState, useEffect } from "react";
import TabFrequenza from "../../components/mainGrafici/TabFrequenza"
import CustomButton from "../CustomButton";

export default function PesoMomento() {

    return (
        <div className="div-genitore-graph">
            <div className="div-title-graph">
                <div>
                    <p className="title-graph">Peso e Momento Dialogico</p>
                </div>
                <div className="div-filtro">
                    <CustomButton                       //forse per questa schermata il filtro non serve
                        text="Filtro"
                        width="120px"
                    />
                </div>
            </div>
            <div className="div-tab-graph">
                <div className="index">
                    <p>Peso Dialogico</p>
                </div>
                <div className="graph rose">
                    <img className="graph-img scale-up" src="../../../static/img/graph/Peso.png" alt="Graph_PesoDialogico" />
                </div>
            </div>
            <div className="div-tab-graph">
                <div className="index">
                    <p>Momento Dialogico</p>
                </div>
                <div className="graph green">
                    <img className="graph-img scale-up" src="../../../static/img/graph/Momento.png" alt="Graph_PesoDialogico" />
                </div>
            </div>

        </div>
    );
}
