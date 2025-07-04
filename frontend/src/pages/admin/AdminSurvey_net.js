import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import FasiAdmin from "../../components/FasiAdmin";
import CustomAlert from "../../components/CustomAlert";
import CustomButton from "../../components/CustomButton";
import GridTematiche from "../../components/GridTematiche";
import CustomTextField from "../../components/CustomTextField";
import CircleIcon from '@mui/icons-material/Circle';
import LinearProgress from '@mui/material/LinearProgress';


import "../../../static/css/adminSurvey.css"
import TextFieldMultiOptions from "../../components/TextFieldMultiOptions";


//oggeto json extra creato da DB e passato per inizializzare valori responses
const responsesDB = {
    tematica: "Politiche giovanili",
    ambiti: "La rete è composta da soggetti pubblici e privati coinvolti nello sviluppo e implementazione di servizi, interventi, progetto relativi alle politiche giovanili. A titolo esemplificativo, la rete è composta da: enti pubblici (ambito, comuni), servizi pubblici (scuole) e privati (coop. Sociali, fondazioni, associazioni di promozione sociale, sportive, culturali) realtà giovanili (associazioni giovanili, gruppi informali di giovani)",
    obiettivo: "Promuovere il protagonismo dei giovani nella vita della comunità",
    tipoAttivita: ["Servizi educativi e formativi", "Promozione culturale",
        "Servizi sociali e socio sanitari",
        "Amministrazione pubblica",
        "Inserimento/reinserimento lavorativo",
        "Promozione dell'attività sportiva"],
    enti: ['Ente 1',
        'Ente 2',
        'Ente 3',
        'Ente 4',
        'Ente 5',
        'Ente 6',
        'Ente 7',
        'Ente 8',
        'Ente 9',
        'Ente 10',
        'Ente 11',
        'Ente 12',
        'Ente 13',
        'Ente 14',
        'Ente 15',
        'Ente 16',],
    copertura: "22 comuni dell’ambito sociale Territoriale X",
    progettiConclusi: ["Progetto 1", "Progetto 2", "Progetto 3", "Progetto 4", "Progetto 5", "Progetto 6", "Progetto 7"],
    progettiInCorso: ["Progetto 8", "Progetto 9", "Progetto 10", "Progetto 11",],
    numEnti: '16',
    numeroRuoli: {
        gestionale: '5',
        decisionale: '4',
        operativo: '6',
    },
    grandezzaCampione: '252',
};


export default function AdminSurvey() {
    const [showAlert, setShowAlert] = useState(false);
    const [progress, setProgress] = useState(0);
    const [buttonDisable, setButtonDisable] = useState(true);
    const [responses, setResponses] = useState(responsesDB);
    const navigate = useNavigate();


    const handleInputChange = (key, value) => {
        setButtonDisable(false)
        setResponses((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleRuoloChange = (ruolo, value) => {
        setButtonDisable(false)
        setResponses((prev) => ({
            ...prev,
            numeroRuoli: {
                ...prev.numeroRuoli,
                [ruolo]: value,
            },
        }));
    };

    const handleSave = () => {
        console.log("Salvataggio delle risposte: ", responses);
        setButtonDisable(true)

        setShowAlert(true);

        setTimeout(() => {                  //simula salvataggio su DB
            setShowAlert(false);
        }, 3000);

        if (progress === 100) {
            // Aspetta un attimo per lasciare che React aggiorni il DOM
            setTimeout(() => {
                const userConfirmed = window.confirm("Hai completato il 100% della pre-survey. Vuoi continuare?");
                if (userConfirmed) {
                    navigate("/questionari");
                }

                // funzione per la creazione della survey Google a partire dalle risposte inserite

                // salvataggio su MongoDB come "link"


            }, 200); // Un piccolo ritardo di 100ms può aiutare a evitare il blocco del rendering
        }
    }

    const getProgressColor = (value) => {
        if (value < 50) return "#dc143c"; // Rosso
        if (value == 100) return "#5BC69A"; // Verde 
        return "#F7A714";// Arancione
    };

    useEffect(() => {
        // Calcolo del progresso
        const totalFields = 11; // Numero totale di domande
        let filledFields = 0;

        const isValidNumber = (num) => {
            if (!/^\d+$/.test(num))
                return false;
            if (num.startsWith('0') && num.length > 1)
                return false;
            return true;
        };

        const isValidText = (text) => {
            if (!text.trim()) return false;
            // Controlla che non contenga tag HTML o script malevoli
            const unsafePatterns = /<[^>]*script|SELECT\s.*\sFROM|INSERT\sINTO|DROP\sTABLE|--|\/\*|\*\/|['";]/i;
            if (unsafePatterns.test(text))
                return false;
            return true;
        };

        if (isValidText(responses.tematica)) filledFields++;
        if (isValidText(responses.ambiti)) filledFields++;
        if (isValidText(responses.obiettivo)) filledFields++;
        if (responses.tipoAttivita.length > 0) filledFields++;
        if (responses.enti.length > 0) filledFields++;
        if (isValidText(responses.copertura)) filledFields++;
        if (responses.progettiConclusi.length > 0) filledFields++;
        if (responses.progettiInCorso.length > 0) filledFields++;
        if (isValidNumber(responses.numEnti)) filledFields++;
        if (isValidNumber(responses.numeroRuoli.gestionale) && isValidNumber(responses.numeroRuoli.decisionale) && isValidNumber(responses.numeroRuoli.operativo)) filledFields++;
        if (isValidNumber(responses.grandezzaCampione)) filledFields++;

        setProgress(Math.round((filledFields / totalFields) * 100));
    }, [responses]);

    return (
        <Layout
            title="Assessment X"
            spallasx={<FasiAdmin status={[1, 0, 0]} />}
            main={
                <div className="div-genitore">
                    <div className="div-testo">
                        Gentile admin, ti invitiamo a rispondere alle seguenti domande. Le tue risposte sono necessarie alla personalizzazione del questionario da somministrare ai ruoli professionali che vuoi coinvolgere nell’indagine. Il questionario si genererà dopo che avrai salvato le tue risposte.
                    </div>
                    <div className="div-domande">
                        <div>
                            <span className="domanda">1. Qual è la tematica di cui si occupa la rete?</span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" onChange={(e) => handleInputChange("tematica", e.target.value)} value={responses.tematica} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">2. Quali sono gli ambiti di intervento dei soggetti che compongono la rete? </span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" onChange={(e) => handleInputChange("ambiti", e.target.value)} value={responses.ambiti} />
                            </div>
                        </div>

                        <div>
                            <span className="domanda">3. Se esplicito, qual è l’obiettivo della rete? </span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" onChange={(e) => handleInputChange("obiettivo", e.target.value)} value={responses.obiettivo} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">4. Quali sono le tipologie di attività portate avanti dalla rete? </span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("tipoAttivita", values)} value={responses.tipoAttivita} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">5. Elenca gli enti appartenenti alla rete  </span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("enti", values)} value={responses.enti} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">6. Qual è il livello di copertura della rete? </span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" onChange={(e) => handleInputChange("copertura", e.target.value)} value={responses.copertura} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">7. Quali attività/progetti sono stati realizzati e conclusi negli ultimi 3 anni dalla rete rispetto al tema che ha scelto?  </span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("progettiConclusi", values)} value={responses.progettiConclusi} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">8. Quali attività/progetti sta attualmente portando avanti la rete? </span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("progettiInCorso", values)} value={responses.progettiInCorso} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">9. Quanti sono gli enti che ritieni possano essere coinvolti nell’indagine ?</span>
                            <div className="div-opzioni">
                                <CustomTextField //style={{ marginLeft: 30 }}
                                    type="number"
                                    width="90px"
                                    onChange={(e) => handleInputChange("numEnti", e.target.value)}
                                    value={responses.numEnti}

                                />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">10. Quanti soggetti per ciascun ruolo ritiene utile coinvolgere in ogni ente?</span>
                            <div className="div-opzioni">
                                <div className="div-counter" >
                                    <div style={{ marginLeft: 30, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        <CircleIcon style={{ fontSize: "13px" }} />
                                    </div>
                                    <div style={{ marginLeft: 8, width: 170 }}>
                                        <span className="domanda">Ruolo gestionale</span>
                                    </div>
                                    <div>
                                        <CustomTextField
                                            type="number"
                                            width="90px"
                                            onChange={(e) => handleRuoloChange("gestionale", e.target.value)}
                                            value={responses.numeroRuoli.gestionale}

                                        />

                                    </div>
                                </div>
                                <div className="div-counter" >
                                    <div style={{ marginLeft: 30, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        <CircleIcon style={{ fontSize: "13px" }} />
                                    </div>
                                    <div style={{ marginLeft: 8, width: 170 }}>
                                        <span className="domanda">Ruolo decisionale</span>
                                    </div>
                                    <div>
                                        <CustomTextField
                                            type="number"
                                            width="90px"
                                            onChange={(e) => handleRuoloChange("decisionale", e.target.value)}
                                            value={responses.numeroRuoli.decisionale}
                                        />

                                    </div>
                                </div>
                                <div className="div-counter" >
                                    <div style={{ marginLeft: 30, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        <CircleIcon style={{ fontSize: "13px" }} />
                                    </div>
                                    <div style={{ marginLeft: 8, width: 170 }}>
                                        <span className="domanda">Ruolo operativo</span>
                                    </div>
                                    <div >
                                        <CustomTextField
                                            type="number"
                                            width="90px"
                                            onChange={(e) => handleRuoloChange("operativo", e.target.value)}
                                            value={responses.numeroRuoli.operativo}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="domanda">11. Considerando le risposte alla domande 8 e 9, qual è la grandezza del campione totale dell’indagine?</span>
                            <div className="div-opzioni">
                                <CustomTextField //style={{ marginLeft: 30 }}
                                    type="number"
                                    width="90px"
                                    onChange={(e) => handleInputChange("grandezzaCampione", e.target.value)}
                                    value={responses.grandezzaCampione}

                                />
                            </div>
                        </div>

                    </div>





                    <div className="div-terza-riga">
                        <div className="div-salva">
                            <div className="button-salva">
                                <CustomButton
                                    text='Salva'
                                    width='220px'
                                    onClick={handleSave}
                                    disabled={buttonDisable}
                                />
                            </div>

                            <div className="progress">
                                <LinearProgress
                                    variant="determinate"
                                    value={progress}
                                    sx={{
                                        height: 7, // Spessore della barra
                                        borderRadius: 5, // Arrotondamento degli angoli
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: getProgressColor(progress), // Colore in base al progresso
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className={`alert-message fade-alert ${!showAlert ? "hidden" : ""}`}>
                            {showAlert && <CustomAlert text="Survey salvata" />}
                        </div>

                    </div>

                </div>
            }

        />
    );
}