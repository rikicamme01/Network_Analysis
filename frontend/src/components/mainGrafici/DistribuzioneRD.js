import React, { useState, useEffect } from "react";
import TabFrequenza from "../../components/mainGrafici/TabFrequenza"
import Filter_graph from "./Filter_graph";


const headers_gruppo = [
    { key: 'classe', label: 'Classe', align: 'left' },
    { key: 'n', label: 'nº', align: 'center' },
    { key: 'frequenza', label: 'Frequenza', align: 'center' },
];

const rows_gruppo = [
    { classe: 'Generativi', n: 25, frequenza: 30 },
    { classe: 'Mantenimento', n: 25, frequenza: 30 },
    { classe: 'Ibridi', n: 25, frequenza: 30 },
];

const rows_RD = [
    { classe: 'Sancire', n: 30, frequenza: 38.46 },
    { classe: 'Descrizione', n: 15, frequenza: 19.23 },
    { classe: 'Possibilità', n: 6, frequenza: 7.69 },
    { classe: 'Opinione', n: 6, frequenza: 7.69 },
    { classe: 'Specificazione', n: 6, frequenza: 7.69 },
    { classe: 'Giustificazione', n: 6, frequenza: 7.69 },
    { classe: 'Causa', n: 3, frequenza: 3.85 },
    { classe: 'Conferma', n: 3, frequenza: 3.85 },
    { classe: 'Implicazione', n: 3, frequenza: 3.85 },
];

const headers_AdS = [
    { key: 'classe', label: 'Classe', align: 'left' },
    { key: 'n', label: 'nº', align: 'center' },
    { key: 'frequenza', label: 'Frequenza', align: 'center' },
    { key: 'riferimento', label: 'Riferimento', align: 'center' },
];

const rows_AdS = [
    { classe: 'Coinvolgimento', n: 9, frequenza: 30.0, riferimento: 'sancire' },
    { classe: 'Associazioni', n: 9, frequenza: 30.0, riferimento: 'sancire' },
    { classe: 'Aggregazione', n: 6, frequenza: 20.0, riferimento: 'sancire' },
    { classe: 'Bisogni', n: 6, frequenza: 20.0, riferimento: 'sancire' },
    { classe: 'Reti', n: 3, frequenza: 100.0, riferimento: 'causa' },
    { classe: 'Associazioni', n: 3, frequenza: 50.0, riferimento: 'possibilità' },
    { classe: 'Bisogni', n: 3, frequenza: 50.0, riferimento: 'possibilità' },
    { classe: 'Coinvolgimento', n: 6, frequenza: 100.0, riferimento: 'opinione' },
    { classe: 'Coinvolgimento', n: 3, frequenza: 100.0, riferimento: 'conferma' },
    { classe: 'Bisogni', n: 6, frequenza: 40.0, riferimento: 'descrizione' },
    { classe: 'Reti', n: 3, frequenza: 20.0, riferimento: 'descrizione' },
    { classe: 'Associazioni', n: 3, frequenza: 20.0, riferimento: 'descrizione' },
    { classe: 'Coinvolgimento', n: 3, frequenza: 20.0, riferimento: 'descrizione' },
    { classe: 'Reti', n: 3, frequenza: 50.0, riferimento: 'specificazione' },
    { classe: 'Associazioni', n: 3, frequenza: 50.0, riferimento: 'specificazione' },
    { classe: 'Reti', n: 3, frequenza: 100.0, riferimento: 'implicazione' },
    { classe: 'Coinvolgimento', n: 3, frequenza: 50.0, riferimento: 'giustificazione' },
    { classe: 'Reti', n: 3, frequenza: 50.0, riferimento: 'giustificazione' },
];

export default function DistribuzioneRD() {


    return (
        <div className="div-genitore-graph">
            <div className="div-first-row-graph">
                <div className="div-title-graph">
                    <p className="title-graph">Distribuzione Repertori Discorsivi</p>
                </div>
                <div className="div-filtro-parents">
                    <Filter_graph/>
                </div>
            </div>
            <div className="div-subtitle-graph">
                <p>Per Gruppo</p>
            </div>
            <div className="div-tab-graph">
                <div className="tab">
                    <TabFrequenza rows={rows_gruppo} headers={headers_gruppo} />
                </div>
                <div className="graph">
                    <img className="graph-img" src="../../../static/img/graph/Distribuzione_RDxGruppo.png" alt="Graph_Distribuzione_RDxGruppo" />
                </div>
            </div>
            <div className="div-subtitle-graph">
                <p>Per Repertorio Discorsivo</p>
            </div>
            <div className="div-tab-graph">
                <div className="tab">
                    <TabFrequenza rows={rows_RD} headers={headers_gruppo} />
                </div>
                <div className="graph">
                    <img className="graph-img" src="../../../static/img/graph/Distribuzione_RD.png" alt="Graph_Distribuzione_RDxGruppo" />
                </div>
            </div>
            <div className="div-subtitle-graph">
                <p>Arcipelaghi di significato per RD</p>
            </div>
            <div className="div-tab-graph-up-down">
                <div className="graph-up-down">
                    <img className="graph-img-up-down" src="../../../static/img/graph/Distribuzione_AdSxRD.png" alt="Graph_Distribuzione_RDxGruppo" />
                </div>
                <div className="tab-up-down">
                    <TabFrequenza rows={rows_AdS} headers={headers_AdS} />
                </div>
            </div>
        </div>
    );
}
