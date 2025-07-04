import React, { useState, useEffect } from "react";
import TabFrequenza from "../../components/mainGrafici/TabFrequenza"
import Filter_graph from "./Filter_graph";


const headers_AdS = [
    { key: 'classe', label: 'Classe', align: 'left' },
    { key: 'n', label: 'nº', align: 'center' },
    { key: 'frequenza', label: 'Frequenza', align: 'center' },
];

const rows_AdS = [
    { classe: 'Coinvolgimento', n: 24, frequenza: 30.77 },
    { classe: 'Associazioni', n: 18, frequenza: 23.08 },
    { classe: 'Reti', n: 15, frequenza: 19.23 },
    { classe: 'Bisogni', n: 15, frequenza: 19.23 },
    { classe: 'Aggregazione', n: 6, frequenza: 7.69 },
];


const headers_RD = [
    { key: 'classe', label: 'Classe', align: 'left' },
    { key: 'n', label: 'nº', align: 'center' },
    { key: 'frequenza', label: 'Frequenza', align: 'center' },
    { key: 'riferimento', label: 'Riferimento', align: 'center' },
];

const rows_RD = [
    { classe: 'Sancire', n: 9, frequenza: 37.5, riferimento: 'Coinvolgimento' },
    { classe: 'Opinione', n: 6, frequenza: 25.0, riferimento: 'Coinvolgimento' },
    { classe: 'Conferma', n: 3, frequenza: 12.5, riferimento: 'Coinvolgimento' },
    { classe: 'Descrizione', n: 3, frequenza: 12.5, riferimento: 'Coinvolgimento' },
    { classe: 'Giustificazione', n: 3, frequenza: 12.5, riferimento: 'Coinvolgimento' },
    { classe: 'Causa', n: 3, frequenza: 20.0, riferimento: 'Reti' },
    { classe: 'Descrizione', n: 3, frequenza: 20.0, riferimento: 'Reti' },
    { classe: 'Specificazione', n: 3, frequenza: 20.0, riferimento: 'Reti' },
    { classe: 'Implicazione', n: 3, frequenza: 20.0, riferimento: 'Reti' },
    { classe: 'Giustificazione', n: 3, frequenza: 20.0, riferimento: 'Reti' },
    { classe: 'Sancire', n: 9, frequenza: 50.0, riferimento: 'Associazioni' },
    { classe: 'Possibilità', n: 3, frequenza: 16.7, riferimento: 'Associazioni' },
    { classe: 'Descrizione', n: 3, frequenza: 16.7, riferimento: 'Associazioni' },
    { classe: 'Specificazione', n: 3, frequenza: 16.7, riferimento: 'Associazioni' },
    { classe: 'Sancire', n: 6, frequenza: 40.0, riferimento: 'Bisogni' },
    { classe: 'Descrizione', n: 6, frequenza: 40.0, riferimento: 'Bisogni' },
    { classe: 'Possibilità', n: 3, frequenza: 20.0, riferimento: 'Bisogni' },
    { classe: 'Sancire', n: 6, frequenza: 100.0, riferimento: 'Aggregazione' },
];

export default function DistribuzioneAdS() {

    return (
        <div className="div-genitore-graph">
            <div className="div-first-row-graph">
                <div className="div-title-graph">
                    <p className="title-graph">Distribuzione Arcipelaghi di Significato</p>
                </div>
                <div className="div-filtro-parents">
                    <Filter_graph />
                </div>
            </div>
            <div className="div-subtitle-graph">
                <p>Per Arcipelago di Significato</p>
            </div>
            <div className="div-tab-graph">
                <div className="tab">
                    <TabFrequenza rows={rows_AdS} headers={headers_AdS} />
                </div>
                <div className="graph">
                    <img className="graph-img" src="../../../static/img/graph/Distribuzione_AdS.png" alt="Graph_Distribuzione_RDxGruppo" />
                </div>
            </div>
            <div className="div-subtitle-graph">
                <p>Repertori Discorsivi per Ads</p>
            </div>
            <div className="div-tab-graph-up-down">
                <div className="graph-up-down">
                    <img className="graph-img-up-down" src="../../../static/img/graph/Distribuzione_RDxAdS.png" alt="Graph_Distribuzione_RDxGruppo" />
                </div>
                <div className="tab-up-down">
                    <TabFrequenza rows={rows_RD} headers={headers_RD} />
                </div>
            </div>
        </div>
    );
}
