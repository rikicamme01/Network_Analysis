import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import AxiosInstance from '../../Axios';
import "../../../static/css/newAss.css";

export default function NewAss() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        assessmentName: "Assessment X",
        enteName: "Rete per le politiche giovanili dell’ambito sociale territoriale X",
        adminName: "Mario Rossi",
        adminEmail: "mariorossi@gmail.com",
    });

    const [formErrors, setFormErrors] = useState({});

    // Gestione dei cambiamenti negli input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validazione dei campi
    const validateForm = () => {
        const errors = {};

        if (!formData.assessmentName.trim()) errors.assessmentName = "Nome Assessment è obbligatorio.";
        if (!formData.enteName.trim()) errors.enteName = "Nominativo Ente/Rete è obbligatorio.";
        if (!formData.adminName.trim()) errors.adminName = "Nome e Cognome Amministratore sono obbligatori.";
        if (!formData.adminEmail.trim()) {
            errors.adminEmail = "Email Amministratore è obbligatoria.";
        } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
            errors.adminEmail = "Formato email non valido.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Restituisce `true` se non ci sono errori
    };
    const sendAssessment = async (data) => {
        try {
            await AxiosInstance.post('/api/set_assessment/', {
                assessmentName: data.assessmentName,
                enteName: data.enteName,
                adminName: data.adminName,
                adminEmail: data.adminEmail,
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || "Errore durante il salvataggio");
            return
        }
    };

    const handle_navigation = async () => {
        try {
            const response = await AxiosInstance.get('/api/get_typeAss/');
            const type = response.data.typeAss;

            if (type === 'org') return "/adminSurvey_org";
            else if (type === 'net') return "/adminSurvey_net";
            else throw new Error("Tipo di assessment sconosciuto");
        } catch (error) {
            alert(error.response?.data?.error || "Errore durante la lettura del typeAss");
            return null; // o puoi gestirlo in altro modo
        }
    };
    // Gestione del submit
    const handleSubmit = async () => {
        if (validateForm()) {
            console.log("Form data:", formData);
            
            sendAssessment(formData);
            //per navigare verso la pre survey giusta bisogna leggere il type assessment [net o org]
            
            const route = await handle_navigation();
            if (route) {
                navigate(route);
            }
        }
    };

    return (
        <Layout
            title="Crea un nuovo assessments"
            main={
                <div className="div-text-button">
                    <div className="div-text-field-1">
                        <CustomTextField
                            label="*Nome Assessment"
                            name="assessmentName"
                            width="470px"
                            value={formData.assessmentName}
                            onChange={handleChange}
                            error={!!formErrors.assessmentName}
                            helperText={formErrors.assessmentName}
                        />
                    </div>
                    <div className="div-text-field">
                        <CustomTextField
                            label="*Nominativo Ente/Rete"
                            name="enteName"
                            width="470px"
                            value={formData.enteName}
                            onChange={handleChange}
                            error={!!formErrors.enteName}
                            helperText={formErrors.enteName}
                        />
                    </div>
                    <div className="div-text-field">
                        <CustomTextField
                            label="*Nome e Cognome Amministratore"
                            name="adminName"
                            width="470px"
                            value={formData.adminName}
                            onChange={handleChange}
                            error={!!formErrors.adminName}
                            helperText={formErrors.adminName}
                        />
                    </div>
                    <div className="div-text-field">
                        <CustomTextField
                            label="*Email Amministratore"
                            name="adminEmail"
                            width="470px"
                            value={formData.adminEmail}
                            onChange={handleChange}
                            error={!!formErrors.adminEmail}
                            helperText={formErrors.adminEmail}
                        />
                    </div>
                    <div className="div-text-field">
                        <CustomButton text="Crea" width="200px" onClick={handleSubmit} />
                    </div>
                </div>
            }
        />
    );
}
