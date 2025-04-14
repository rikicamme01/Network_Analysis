import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from "@mui/material/TextField";
import CustomButton from "../components/CustomButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "../../static/css/login.css";
import AxiosInstance from "../Axios";

export default function Login() {

    const usernameRef = useRef();
    const passwordRef = useRef();
    //const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    /*const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Inverte lo stato di visibilità
    };*/
    /*
    const add_user = async (email, password) => {
        try {
            const response = await AxiosInstance.post('/api/add_user/', {
                email: email,
                password: password
            });
            //alert(response.data.message); 
        } catch (error) {
            alert(error.response?.data?.error || "An error occurred");  // Mostra l'errore
        }
    };
    */
    const readingStatusIndagine = async () => {
        try {
            const response = await AxiosInstance.get('/api/get_statusIndagine/');
            const status = response.data.statusIndagine;

            if (status === 0) return "/newAss";
            else if (status === 1) return "/newAss";
            else if (status === 2) return "/newAss";
            else if (status === 3) return "/newAss";
            else if (status === 4) return "/newAss";
            else throw new Error("Status indagine sconosciuto");
        } catch (error) {
            alert(error.response?.data?.error || "Errore durante la lettura del statusIndagine");
            return null; // o puoi gestirlo in altro modo
        }
    };

    const handleLogin = async () => {

        setPasswordError(false);
        setUsernameError(false);

        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (!username) {
            setUsernameError(true);
            return;
        }
        if (password.length < 6) {
            setPasswordError(true);
            return;
        }

        // (thread 1) Salvataggio e invio dei dati a un'API (qui si potrebbe aggiungere la logica di autenticazione)
        const loginData = { username, password };
        const isAuthenticated = true;
        console.log("Dati di login:", loginData);
        //add_user(username, password);



        //(thread 2) Abilita collegamento a /newAss
        if (isAuthenticated) {
            if (username === 'admin') {
                const route = await readingStatusIndagine();
                if (route) {
                    navigate(route);
                }
            } else if (username === 'analyzer') {
                navigate("/databaseAss");
            } else {
                console.log("Utente non autorizzato");
            }
        } else {
            console.log("Utente non autenticato");
        }

    };


    return (
        <div className="login">
            <img
                className="dialogica-logo-lab"
                alt="Group"
                src="../../static/img/Login/Dialogica Logo_Lab.png"
            />
            <div className="semi-circle">
                <img
                    className="net-cohesion-index"
                    src="../../static/img/Login/Group_Net_Cohesion_Index.png"
                />

                {/* Campo Username con icona */}
                <TextField
                    className="username-text-field"
                    inputRef={usernameRef}
                    label="Email-ID"
                    variant="outlined" // Cambia con "filled" o "standard" se preferisci
                    fullWidth
                    error={usernameError}
                    helperText={usernameError ? 'Questo campo è obligatorio' : ''}
                    sx={{
                        width: '300px', // Larghezza sufficiente per visualizzare l'icona e il testo
                        fontSize: '20px', // Corretto il font-size
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon
                                        sx={{ fontSize: 40, color: 'black' }} // Dimensione dell'icona
                                    />
                                </InputAdornment>
                            ),
                        }
                    }}
                />

                {/* Campo Password con icona */}
                <TextField
                    className="password-text-field"
                    label="Password"
                    inputRef={passwordRef}
                    //type='password' // Cambia il tipo dinamicamente
                    variant="outlined" // Cambia con "filled" o "standard" se preferisci
                    fullWidth
                    error={passwordError}
                    helperText={passwordError ? 'La password deve avere almeno 6 caratteri' : ''}
                    sx={{
                        width: '300px', // Larghezza sufficiente per visualizzare l'icona e il testo
                        fontSize: '20px', // Corretto il font-size
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon
                                        sx={{ fontSize: 40, color: 'black' }} // Dimensione dell'icona
                                    />
                                </InputAdornment>
                            ),

                        }
                    }}
                />
                <div className="button">
                    <CustomButton
                        text='Login'
                        width='300px'
                        onClick={handleLogin} />
                </div>
                <div className="div-cariplo">
                    <span className="con-il-supporto-di">Con il supporto di </span>
                    <img className="logo-cariplo"
                        src="../../static/img/Login/Logo_Cariplo.png"
                        alt='Logo Cariplo' />
                </div>
                <div className="div-lab">
                    <img className="logo-lab"
                        src="../../static/img/Login/LAB_logo.png"
                        alt='Logo Cariplo' />
                </div>


            </div>
        </div>
    );
}
