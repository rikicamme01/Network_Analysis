import React from "react";
import Layout from "../../components/Layout";
import FasiAdmin from "../../components/FasiAdmin";
import CustomAlert from "../../components/CustomAlert";
import CustomButton from "../../components/CustomButton";
import GridTematiche from "../../components/GridTematiche";
import CustomTextField from "../../components/CustomTextField";
import CircleIcon from '@mui/icons-material/Circle';

import "../../../static/css/adminSurvey.css"
import TextFieldMultiOptions from "../../components/TextFieldMultiOptions";



export default function AdminSurvey() {

    const handleSave = () => {
        console.log("")
    }

    return (
        <Layout
            title="Nome_ass"
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
                                <GridTematiche />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">2. Di cosa si occupa la tua organizzazione? </span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" />
                            </div>
                        </div>

                        <div>
                            <span className="domanda">3. Qual è la forma giuridica dell'organizzazione? </span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">4. Qual è la Mission della tua organizzazione? </span>
                            <div className="div-opzioni">
                                <CustomTextField width="600px" />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">5. Elenco di aree/dipartimenti/divisioni interne all’organizzazione  </span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">6. Quali attività/progetti sono stati realizzati e conclusi negli ultimi 3 anni  dall’organizzazione rispetto al tema che ha scelto?  </span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">7. Quali attività/progetti sono in corso di sviluppo rispetto al tema che ha scelto?</span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">8. Quali sono le aree/dipartimenti/divisioni che ritieni possano essere coinvolti in questa indagine?</span>
                            <div className="div-opzioni">
                                <TextFieldMultiOptions />
                            </div>
                        </div>
                        <div>
                            <span className="domanda">9. Quanti soggetti per ciascun ruolo ritieni utile coinvolgere in ogni area/dipartimento divisione?</span>
                            <div className="div-opzioni">
                                <div className="div-counter" >
                                    <div style={{ marginLeft: 30, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        <CircleIcon style={{ fontSize: "15px" }} />
                                    </div>
                                    <div style={{ marginLeft: 8 }}>
                                        <span className="domanda">Ruolo gestionale</span>
                                    </div>
                                    <div style={{ marginLeft: 20 }}>
                                        <CustomTextField
                                            type="number"
                                            width="90px"
                                        />

                                    </div>
                                </div>
                                <div className="div-counter" >
                                    <div style={{ marginLeft: 30, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        <CircleIcon style={{ fontSize: "15px" }} />
                                    </div>
                                    <div style={{ marginLeft: 8 }}>
                                        <span className="domanda">Ruolo decisionale</span>
                                    </div>
                                    <div style={{ marginLeft: 20 }}>
                                        <CustomTextField
                                            type="number"
                                            width="90px"
                                        />

                                    </div>
                                </div>
                                <div className="div-counter" >
                                    <div style={{ marginLeft: 30, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                        <CircleIcon style={{ fontSize: "15px" }} />
                                    </div>
                                    <div style={{ marginLeft: 8 }}>
                                        <span className="domanda">Ruolo operativo</span>
                                    </div>
                                    <div style={{ marginLeft: 20 }}>
                                        <CustomTextField
                                            type="number"
                                            width="90px"
                                        />

                                    </div>
                                </div>
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

                                />
                            </div>

                            <div className="progress">
                                Progress
                            </div>
                        </div>
                        <div className="div-alert">
                            <CustomAlert
                                text='Survey salvata'



                            />
                        </div>

                    </div>

                </div>
            }

        />
    );
}