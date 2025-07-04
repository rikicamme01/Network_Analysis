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
import AxiosInstance from '../../Axios'


import "../../../static/css/adminSurvey.css"
import TextFieldMultiOptions from "../../components/TextFieldMultiOptions";


export default function AdminSurvey() {
    const [showAlert, setShowAlert] = useState(false);
    const [progress, setProgress] = useState(0);
    const [buttonDisable, setButtonDisable] = useState(true);
    const [responses, setResponses] = useState({
        tematica: "",
        organizzazione: "",
        formaGiuridica: "",
        mission: "",
        areeInterne: [""],
        progettiConclusi: [""],
        progettiInCorso: [""],
        areeCoinvolte: [""],
        numeroRuoli: {
            gestionale: 0,
            decisionale: 0,
            operativo: 0,
        },
        grandezzaCampione: 0,
    });
    const [assessmentName, setAssessmentName] = useState("");

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
    const savePreSurvey = async (data) => {
        try {
            const response = await AxiosInstance.post('/api/set_preSurvey/', data);
        } catch (error) {
            alert(error.response?.data?.error || "Errore durante il salvataggio della pre-survey");
            return
        }
    }

    const handleSave = async () => {
        console.log("Salvataggio delle risposte: ", responses);
        setButtonDisable(true)

        setShowAlert(true);

        setTimeout(() => {                  //simula salvataggio su DB
            setShowAlert(false);
        }, 3000);

        //salvataggio info pre-survey su MongoDB
        await savePreSurvey(responses)

        if (progress === 100) {
            setTimeout(async () => {
                const userConfirmed = window.confirm("Hai completato il 100% della pre-survey. Vuoi continuare?");
                if (userConfirmed) {
                    try {
                        await setSurveyLink();
                        await setStatusIndagine();
                        await setStartTime();
                        navigate("/questionari");
                    } catch (error) {
                        console.error("Errore durante la generazione o aggiornamento:", error);
                    }
                }
            }, 300);
        }
    }

    const setSurveyLink = async () => {
        try {
            const response = await AxiosInstance.get('/api/forms/generate_google_org_survey/');
            console.log("Google Form URL:", response.data.form_url);
        } catch (error) {
            console.error("Errore completo:", error);
            alert(error.response?.data?.error || "Errore durante la creazione del Google form");
        }
    }

    const setStatusIndagine = async () => {
        try {
            await AxiosInstance.post('/api/set_statusIndagine/', {
                statusIndagine: 2
            });
        } catch (error) {
            alert(error.response?.data?.error || "Errore durante l'aggiornamento di statusIndagine=2");
            return
        }
    }

    const setStartTime = async () => {
        try {
            await AxiosInstance.post('/api/set_startTime/', {
                startTime: new Date().toISOString() 
            });
        } catch (error) {
            alert(error.response?.data?.error || "Errore durante l'aggiornamento di startTime");
            return
        }
    }

    const getProgressColor = (value) => {
        if (value < 50) return "#dc143c"; // Rosso
        if (value <= 90) return "#F7A714"; // Arancione
        return "#5BC69A"; // Verde
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const preSurveyResponse = await AxiosInstance.get("/api/get_preSurvey/");
                const data = preSurveyResponse.data;

                setResponses({
                    tematica: data.tematica || "",
                    organizzazione: data.organizzazione || "",
                    formaGiuridica: data.formaGiuridica || "",
                    mission: data.mission || "",
                    areeInterne: (data.areeInterne && data.areeInterne.length > 0) ? data.areeInterne : [""],
                    progettiConclusi: (data.progettiConclusi && data.progettiConclusi.length > 0) ? data.progettiConclusi : [""],
                    progettiInCorso: (data.progettiInCorso && data.progettiInCorso.length > 0) ? data.progettiInCorso : [""],
                    areeCoinvolte: (data.areeCoinvolte && data.areeCoinvolte.length > 0) ? data.areeCoinvolte : [""],
                    numeroRuoli: {
                        gestionale: data.numeroRuoli?.gestionale || 0,
                        decisionale: data.numeroRuoli?.decisionale || 0,
                        operativo: data.numeroRuoli?.operativo || 0,
                    },
                    grandezzaCampione: data.grandezzaCampione || 0,
                });

            } catch (error) {
                console.error("Errore nel caricamento iniziale:", error);
            }
            try {
                const response = await AxiosInstance.get("/api/get_assessmentName/");
                setAssessmentName(response.data.assessmentName);
            } catch (error) {
                console.error("Errore durante il recupero del titolo del questionario:", error);
            }

        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const totalFields = 10;
        let filledFields = 0;

        const isNonEmptyString = (s) => typeof s === 'string' && s.trim() !== "";
        const hasValidArray = (arr) => Array.isArray(arr) && arr.some(isNonEmptyString);

        if (responses.tematica.trim() !== "") filledFields++;
        if (responses.organizzazione.trim() !== "") filledFields++;
        if (responses.formaGiuridica.trim() !== "") filledFields++;
        if (responses.mission.trim() !== "") filledFields++;
        if (hasValidArray(responses.areeInterne)) filledFields++;
        if (hasValidArray(responses.progettiConclusi)) filledFields++;
        if (hasValidArray(responses.progettiInCorso)) filledFields++;
        if (hasValidArray(responses.areeCoinvolte)) filledFields++;
        if (
            responses.numeroRuoli &&
            (responses.numeroRuoli.gestionale > 0 ||
                responses.numeroRuoli.decisionale > 0 ||
                responses.numeroRuoli.operativo > 0)
        )
            filledFields++;
        if (responses.grandezzaCampione > 0) filledFields++;

        setProgress(Math.round((filledFields / totalFields) * 100));
    }, [responses]);



    return (
        <Layout
            title={assessmentName}
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
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("areeInterne", values)} value={responses.areeInterne} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">6. Quali attività/progetti sono stati realizzati e conclusi negli ultimi 3 anni  dall’organizzazione rispetto al tema che ha scelto?  </span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("progettiConclusi", values)} value={responses.progettiConclusi} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">7. Quali attività/progetti sono in corso di sviluppo rispetto al tema che ha scelto?</span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("progettiInCorso", values)} value={responses.progettiInCorso} />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">8. Quali sono le aree/dipartimenti/divisioni che ritieni possano essere coinvolti in questa indagine?</span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions onChange={(values) => handleInputChange("areeCoinvolte", values)} value={responses.areeCoinvolte} />
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