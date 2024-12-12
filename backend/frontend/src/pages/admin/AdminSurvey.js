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
    tematica: "Sostenibilità",
    organizzazione: "prova 2",
    formaGiuridica: "prova 3",
    mission: "prova 4",
    areeInterna: ["prova 5.1", "prova 5.2", "prova 5.3"],
    progettiConclusi: [],
    progettiInCorso: [],
    areeCoinvolte: [],
    numeroRuoli: {
        gestionale: 23,
        decisionale: 24,
        operativo: 25,
    },
    grandezzaCampione: 0,
};

/*const responsesDB = {
    tematica: "",
    organizzazione: "",
    formaGiuridica: "",
    mission: "",
    areeInterna: [""],
    progettiConclusi: [],
    progettiInCorso: [],
    areeCoinvolte: [],
    numeroRuoli: {
        gestionale: 0,
        decisionale: 0,
        operativo: 0,
    },
    grandezzaCampione: 0,
};*/

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
            //browser alert
            const userConfirmed = window.confirm("Hai completato il 100% della pre-survey. Vuoi continuare?");
            if (userConfirmed) {
                navigate("/questionari"); // Naviga alla nuova pagina
            }

        }
    }

    const getProgressColor = (value) => {
        if (value < 50) return "#dc143c"; // Rosso
        if (value <= 90) return "#F7A714"; // Arancione
        return "#5BC69A"; // Verde
    };

    useEffect(() => {
        // Calcolo del progresso
        const totalFields = 10; // Numero totale di domande
        let filledFields = 0;

        if (responses.tematica) filledFields++;
        if (responses.organizzazione) filledFields++;
        if (responses.formaGiuridica) filledFields++;
        if (responses.mission) filledFields++;
        if (responses.areeInterna.length > 0) filledFields++;
        if (responses.progettiConclusi.length > 0) filledFields++;
        if (responses.progettiInCorso.length > 0) filledFields++;
        if (responses.areeCoinvolte.length > 0) filledFields++;
        if (responses.numeroRuoli.gestionale > 0 && responses.numeroRuoli.decisionale > 0 && responses.numeroRuoli.operativo > 0) filledFields++;
        if (responses.grandezzaCampione > 0) filledFields++;

        setProgress(Math.round((filledFields / totalFields) * 100));
    }, [responses]);

    return (
        <Layout
            title="Assessment A"
            spallasx={<FasiAdmin status={[1, 0, 0]} />}
            main={
                <div className="div-genitore">
                    <div className="div-testo">
                        Gentile admin, ti invitiamo a rispondere alle seguenti domande. Le tue risposte sono necessarie alla personalizzazione del questionario da somministrare ai ruoli professionali che vuoi coinvolgere nell’indagine. Il questionario si genererà dopo che avrai salvato le tue risposte.
                    </div>
                    <div className="div-domande">
                        <div>
                            <span className="domanda">1. Scegli la tematica su cui svolgere l'indagine</span>
                            <div className="div-opzioni">
                                <GridTematiche onSelect={(label) => handleInputChange("tematica", label)} value={responses.tematica} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">2. Di cosa si occupa la tua organizzazione? </span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" onChange={(e) => handleInputChange("organizzazione", e.target.value)} value={responses.organizzazione} />
                            </div>
                        </div>

                        <div>
                            <span className="domanda">3. Qual è la forma giuridica dell'organizzazione? </span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" onChange={(e) => handleInputChange("formaGiuridica", e.target.value)} value={responses.formaGiuridica} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">4. Qual è la Mission della tua organizzazione? </span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" onChange={(e) => handleInputChange("mission", e.target.value)} value={responses.mission} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">5. Elenco di aree/dipartimenti/divisioni interne all’organizzazione  </span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("areeInterna", values)} value={responses.areeInterna} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">6. Quali attività/progetti sono stati realizzati e conclusi negli ultimi 3 anni  dall’organizzazione rispetto al tema che ha scelto?  </span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("progettiConclusi", values)} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">7. Quali attività/progetti sono in corso di sviluppo rispetto al tema che ha scelto?</span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("progettiInCorso", values)} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">8. Quali sono le aree/dipartimenti/divisioni che ritieni possano essere coinvolti in questa indagine?</span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("areeCoinvolte", values)} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">9. Quanti soggetti per ciascun ruolo ritieni utile coinvolgere in ogni area/dipartimento divisione?</span>
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
                            <span className="domanda">10. Considerando le risposte alla domande 8 e 9, qual è la grandezza del campione totale dell’indagine?</span>
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