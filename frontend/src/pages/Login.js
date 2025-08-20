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
import AxiosInstance, { SessionManager } from "../Axios";

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Funzione per inizializzare lo stato dell'indagine per un admin
    const initializeInvestigationStatus = async (username) => {
        try {
            console.log(`Inizializzazione stato indagine per l'utente: ${username}`);

            // Verifichiamo se esiste già uno stato dell'indagine
            const statusResponse = await AxiosInstance.get('/api/get_statusIndagine/');

            // Se riceviamo una risposta ma non contiene statusIndagine o è null/undefined
            if (!statusResponse.data || statusResponse.data.statusIndagine === undefined || statusResponse.data.statusIndagine === null) {
                console.log("Stato indagine non presente, inizializzo a 0");

                // Inizializziamo a 0 (primo accesso)
                await AxiosInstance.post('/api/set_statusIndagine/', {
                    statusIndagine: 0
                });
                return 0;
            } else {
                // Se lo stato esiste già, lo restituiamo
                console.log(`Stato indagine esistente: ${statusResponse.data.statusIndagine}`);
                return statusResponse.data.statusIndagine;
            }
        } catch (error) {
            // Verifichiamo se l'errore è dovuto alla mancanza dello stato (404)
            if (error.response && error.response.status === 404) {
                console.log("Stato indagine non trovato (404), inizializzo a 0");

                try {
                    // Inizializziamo lo stato a 0
                    await AxiosInstance.post('/api/set_statusIndagine/', {
                        statusIndagine: 0
                    });
                    console.log("Stato indagine inizializzato a 0 per il primo accesso");
                    return 0;
                } catch (initError) {
                    console.error("Errore durante l'inizializzazione dello stato indagine:", initError);
                    throw initError; // Rilanciamo l'errore per gestirlo a un livello superiore
                }
            } else {
                // Se è un altro tipo di errore (connessione, server, ecc.)
                console.error("Errore durante il recupero dello stato indagine:", error);
                throw error; // Rilanciamo l'errore per gestirlo a un livello superiore
            }
        }
    };

    // Funzione per inizializzare la sessione utente dopo il login
    const initializeUserSession = async (username) => {
        try {
            console.log(`Inizializzazione sessione per l'utente: ${username}`);

            // Otteniamo i dati di sessione esistenti se presenti
            const sessionResponse = await SessionManager.getSessionData();

            // Se non ci sono dati di sessione, inizializziamo con valori predefiniti
            if (!sessionResponse.data.session_data || Object.keys(sessionResponse.data.session_data).length === 0) {
                console.log("Nessun dato di sessione trovato, creazione nuova sessione");

                // Determiniamo la vista predefinita in base al ruolo dell'utente
                let currentView = 'newAss'; // Default per utenti normali

                if (username === 'admin' || username === 'riccardo') {
                    currentView = 'dashboard';
                } else if (username === 'analyzer') {
                    currentView = 'databaseAss';
                }

                await SessionManager.saveSessionData({
                    username: username,
                    last_login: new Date().toISOString(),
                    app_state: {
                        current_view: currentView,
                        theme: 'light',
                        language: 'it'
                    }
                });
            } else {
                console.log("Aggiornamento timestamp dell'ultimo login");
                // Aggiorniamo solo il timestamp del login
                await SessionManager.updateSessionField('last_login', new Date().toISOString());
            }

            // Se l'utente è admin o riccardo, inizializziamo o leggiamo lo stato dell'indagine
            if (username === 'admin' || username === 'riccardo') {
                console.log(`Inizializzazione stato indagine per super-utente: ${username}`);
                const statusIndagine = await initializeInvestigationStatus(username);
                console.log(`Stato indagine determinato: ${statusIndagine}`);
                await SessionManager.updateSessionField('current_status', statusIndagine);
                return statusIndagine;
            }

            return null; // Per gli altri utenti non gestiamo statusIndagine
        } catch (error) {
            console.error("Errore nell'inizializzazione della sessione:", error);
            return null;
        }
    };

    const readingStatusIndagine = async () => {
        try {
            const response = await AxiosInstance.get('/api/get_statusIndagine/');
            const status = response.data.statusIndagine;

            console.log("Stato indagine rilevato:", status);

            if (status === 0) return "/newAss";
            else if (status === 1)
                // chiamata e lettura type per "/adminSurvey_org" o "/adminSurvey_net"
                return "/adminSurvey_org";
            else if (status === 2) return "/questionari";
            else if (status === 3) return "/reportLoading";
            else if (status === 4) return "/reportFinal";
            else {
                console.warn("Status indagine sconosciuto:", status);
                return "/newAss"; // Default route per status sconosciuto
            }
        } catch (error) {
            console.error("Errore durante la lettura del statusIndagine:", error);
            console.log("Reindirizzamento a /newAss come fallback");
            return "/newAss"; // Default route in caso di errore
        }
    };

    const handleLogin = async () => {
        setIsLoading(true);
        setPasswordError(false);
        setUsernameError(false);

        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (!username) {
            setUsernameError(true);
            setIsLoading(false);
            return;
        }
        if (password.length < 6) {
            setPasswordError(true);
            setIsLoading(false);
            return;
        }

        try {
            const res = await AxiosInstance.post('/api/wp_login/', {
                username: username,
                password: password
            });

            if (res.data.status === "ok") {
                const { token, user } = res.data;

                // Salva token WP
                localStorage.setItem("wp_token", token);
                localStorage.setItem("username", user.email);

                // Usa questo token nelle chiamate future
                AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Inizializza sessione utente
                const statusIndagine = await initializeUserSession(username);

                // Navigazione come prima
                if (username === 'admin') {
                    const route = await readingStatusIndagine();
                    navigate(route);
                } else if (username === 'analyzer') {
                    navigate("/databaseAss");
                } else {
                    navigate("/newAss");
                }
            } else {
                alert("Login fallito: credenziali non valide");
            }

        } catch (error) {
            console.error("Errore login WP:", error);
            alert("Login fallito. Verifica le credenziali.");
        } finally {
            setIsLoading(false);
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
                    variant="outlined"
                    fullWidth
                    error={usernameError}
                    helperText={usernameError ? 'Questo campo è obligatorio' : ''}
                    sx={{
                        width: '300px',
                        fontSize: '20px',
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon
                                        sx={{ fontSize: 40, color: 'black' }}
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
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    error={passwordError}
                    helperText={passwordError ? 'La password deve avere almeno 6 caratteri' : ''}
                    sx={{
                        width: '300px',
                        fontSize: '20px',
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon
                                        sx={{ fontSize: 40, color: 'black' }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {showPassword ? (
                                        <VisibilityOff
                                            onClick={togglePasswordVisibility}
                                            sx={{ fontSize: 30, color: 'grey', cursor: 'pointer' }}
                                        />
                                    ) : (
                                        <Visibility
                                            onClick={togglePasswordVisibility}
                                            sx={{ fontSize: 30, color: 'grey', cursor: 'pointer' }}
                                        />
                                    )}
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <div className="button">
                    <CustomButton
                        text={isLoading ? 'Caricamento...' : 'Login'}
                        width='300px'
                        onClick={handleLogin}
                        disabled={isLoading}
                    />
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
                        alt='Logo Lab' />
                </div>
            </div>
        </div>
    );
}