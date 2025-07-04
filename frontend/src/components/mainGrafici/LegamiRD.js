import React, { useState, useEffect } from "react";
import TabFrequenza from "../../components/mainGrafici/TabFrequenza"
import Filter_graph from "./Filter_graph";


const headers_RDRD = [
    { key: 'classe', label: 'Classe', align: 'left' },
    { key: 'n', label: 'nº', align: 'center' },
    { key: 'frequenza', label: 'Frequenza', align: 'center' },
    { key: 'riferimento', label: 'Riferimento', align: 'center' },
];

/*           Classe    Num  Frequenza      Riferimento
0           sancire    4      44.44          sancire
1       possibilità    2      22.22          sancire
2             causa    1      11.11          sancire
3          opinione    1      11.11          sancire
4      implicazione    1      11.11          sancire
5           sancire    1     100.00            causa
6             causa    0       0.00            causa
7       possibilità    1      33.33      possibilità
8           sancire    2      66.67      possibilità
9          opinione    0       0.00         opinione
10      descrizione    2      28.57         opinione
11          sancire    2      28.57         opinione
12         conferma    1      14.29         opinione
13   specificazione    1      14.29         opinione
14     implicazione    1      14.29         opinione
15      descrizione    2      50.00         conferma
16         opinione    1      25.00         conferma
17         conferma    0       0.00         conferma
18   specificazione    1      25.00         conferma
19      descrizione    1      14.29      descrizione
20   specificazione    2      28.57      descrizione
21  giustificazione    2      28.57      descrizione
22         opinione    1      14.29      descrizione
23         conferma    1      14.29      descrizione
24      descrizione    3      42.86   specificazione
25   specificazione    0       0.00   specificazione
26  giustificazione    2      28.57   specificazione
27         opinione    1      14.29   specificazione
28         conferma    1      14.29   specificazione
29          sancire    2      66.67     implicazione
30         opinione    1      33.33     implicazione
31     implicazione    0       0.00     implicazione
32  giustificazione    1      33.33  giustificazione
33      descrizione    1      33.33  giustificazione
34   specificazione    1      33.33  giustificazione
*/



const rows_RDRD = [
    { classe: 'Sancire', n: 12, frequenza: 44.44, riferimento: 'sancire' },
    { classe: 'Possibilità', n: 6, frequenza: 22.22, riferimento: 'sancire' },
    { classe: 'Causa', n: 3, frequenza: 11.11, riferimento: 'sancire' },
    { classe: 'Opinione', n: 3, frequenza: 11.11, riferimento: 'sancire' },
    { classe: 'Implicazione', n: 3, frequenza: 11.11, riferimento: 'sancire' },
    { classe: 'Sancire', n: 3, frequenza: 100.00, riferimento: 'causa' },
    { classe: 'Causa', n: 0, frequenza: 0.00, riferimento: 'causa' },
    { classe: 'Possibilità', n: 3, frequenza: 33.33, riferimento: 'possibilità' },
    { classe: 'Sancire', n: 6, frequenza: 66.67, riferimento: 'possibilità' },
    { classe: 'Opinione', n: 0, frequenza: 0.00, riferimento: 'opinione' },
    { classe: 'Descrizione', n: 6, frequenza: 28.57, riferimento: 'opinione' },
    { classe: 'Sancire', n: 6, frequenza: 28.57, riferimento: 'opinione' },
    { classe: 'Conferma', n: 3, frequenza: 14.29, riferimento: 'opinione' },
    { classe: 'Specificazione', n: 3, frequenza: 14.29, riferimento: 'opinione' },
    { classe: 'Implicazione', n: 3, frequenza: 14.29, riferimento: 'opinione' },
    { classe: 'Descrizione', n: 6, frequenza: 50.00, riferimento: 'conferma' },
    { classe: 'Opinione', n: 3, frequenza: 25.0, riferimento: 'conferma' },
    { classe: 'Conferma', n: 0, frequenza: 0.00, riferimento: 'conferma' },
    { classe: 'Specificazione', n: 3, frequenza: 25.0, riferimento: 'conferma' },
    { classe: 'Descrizione', n: 3, frequenza: 14.29, riferimento: 'descrizione' },
    { classe: 'Specificazione', n: 6, frequenza: 28.57, riferimento: 'descrizione' },
    { classe: 'Giustificazione', n: 6, frequenza: 28.57, riferimento: 'descrizione' },
    { classe: 'Opinione', n: 3, frequenza: 14.29, riferimento: 'descrizione' },
    { classe: 'Conferma', n: 3, frequenza: 14.29, riferimento: 'descrizione' },
    { classe: 'Descrizione', n: 9, frequenza: 42.86, riferimento: 'specificazione' },
    { classe: 'Specificazione', n: 0, frequenza: 0.00, riferimento: 'specificazione' },
    { classe: 'Giustificazione', n: 6, frequenza: 28.57, riferimento: 'specificazione' },
    { classe: 'Opinione', n: 3, frequenza: 14.29, riferimento: 'specificazione' },
    { classe: 'Conferma', n: 3, frequenza: 14.29, riferimento: 'specificazione' },
    { classe: 'Sancire', n: 6, frequenza: 66.67, riferimento: 'implicazione' },
    { classe: 'Opinione', n: 3, frequenza: 33.33, riferimento: 'implicazione' },
    { classe: 'Implicazione', n: 0, frequenza: 0.00, riferimento: 'implicazione' },
    { classe: 'Giustificazione', n: 3, frequenza: 33.33, riferimento: 'giustificazione' },
    { classe: 'Descrizione', n: 3, frequenza: 33.33, riferimento: 'giustificazione' },
    { classe: 'Specificazione', n: 3, frequenza: 33.33, riferimento: 'giustificazione' },
];

export default function LegamiRD() {

    return (
        <div className="div-genitore-graph">
            <div className="div-first-row-graph">
                <div className="div-title-graph">
                    <p className="title-graph">Legami fra Repertori Discorsivi</p>
                </div>
                <div className="div-filtro-parents">
                    <Filter_graph />
                </div>
            </div>
            <div className="div-subtitle-graph">
                <p>Legami RD-RD</p>
            </div>
            <div className="div-tab-graph-up-down">
                <div className="graph-up-down">
                    <img className="graph-img-up-down scale" src="../../../static/img/graph/RDxRD.png" alt="Graph_Distribuzione_RDxRD" />
                </div>
                <div className="tab-up-down">
                    <TabFrequenza rows={rows_RDRD} headers={headers_RDRD} />
                </div>
            </div>
        </div>
    );
}
