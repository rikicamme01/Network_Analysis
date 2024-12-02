import React from "react";
import Layout from "../../components/Layout";
import FasiAdmin from "../../components/FasiAdmin";
import CustomAlert from "../../components/CustomAlert";
import CustomButton from "../../components/CustomButton";
import "../../../static/css/adminSurvey.css"


export default function AdminSurvey() {

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
                        Domande
                    </div>
                    <div className="div-terza-riga">
                        <div className="div-salva">
                            <div className="button-salva">
                                <CustomButton
                                    text='Salva'
                                    width='220px'

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