import React, { useState, useEffect } from "react";
import Filter_graph from "./Filter_graph";

export default function PesoMomento() {

    return (
        <div className="div-genitore-graph">
            <div className="div-first-row-graph">
                <div className="div-title-graph">
                    <p className="title-graph">Peso e Momento Dialogico</p>
                </div>
                <div className="div-filtro-parents">
                    <Filter_graph />
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
