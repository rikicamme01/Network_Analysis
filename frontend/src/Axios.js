import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000";

// Crea l'istanza
const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 300000,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

// Recupera il token dal localStorage
const accessToken = localStorage.getItem("access_token");

// Se esiste, aggiungi il token nell'header Authorization [RIMUOVIBILE se uso già l'interceptor]
//if (accessToken) {
//    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//}

// Interceptor per gestire automaticamente l'autenticazione in ogni richiesta
/*
AxiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Timeout della richiesta');
        } else if (error.response) {
            console.error('Errore del server:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Nessuna risposta dal server:', error.request);
        } else {
            console.error('Errore di configurazione:', error.message);
        }
        return Promise.reject(error);
    }
);
*/

AxiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("wp_token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor per gestire refresh token e errori
AxiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        // Se è un errore 401 (Unauthorized) e non è già un tentativo di refresh
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Tentativo di refresh del token
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    // Nessun refresh token disponibile, reindirizza al login
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                const response = await axios.post(`${baseUrl}/api/token/refresh/`, {
                    refresh: refreshToken
                });

                const { access } = response.data;

                // Aggiorna il token di accesso
                localStorage.setItem('access_token', access);
                AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                originalRequest.headers['Authorization'] = `Bearer ${access}`;

                // Ritenta la richiesta originale
                return AxiosInstance(originalRequest);
            } catch (refreshError) {
                // Se il refresh fallisce, reindirizza al login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Metodi per gestire la sessione dell'utente
const SessionManager = {
    /**
     * Salva i dati di sessione completi dell'utente
     * @param {Object} sessionData - Dati di sessione da salvare
     * @returns {Promise} Risposta API
     */
    saveSessionData: async (sessionData) => {
        return AxiosInstance.post('/api/save_user_data/', {
            data: sessionData
        });
    },

    /**
     * Aggiorna un singolo campo nei dati di sessione
     * @param {string} fieldName - Nome del campo da aggiornare
     * @param {any} fieldValue - Valore da assegnare al campo
     * @returns {Promise} Risposta API
     */
    updateSessionField: async (fieldName, fieldValue) => {
        return AxiosInstance.post('/api/update_session_field/', {
            field: fieldName,
            value: fieldValue
        });
    },

    /**
     * Ottiene tutti i dati di sessione dell'utente corrente
     * @returns {Promise} Risposta API con i dati di sessione
     */
    getSessionData: async () => {
        return AxiosInstance.get('/api/get_user_session/');
    },

    /**
     * Salva i dati dell'indagine corrente
     * @param {Object} assessmentData - Dati dell'indagine
     * @returns {Promise} Risposta API
     */
    saveAssessment: async (assessmentData) => {
        const response = await AxiosInstance.post('/api/set_assessment/', assessmentData);

        // Aggiorniamo anche la sessione locale con l'informazione sull'indagine corrente
        if (response.data.status === "ok") {
            await SessionManager.updateSessionField('current_assessment', {
                assessmentName: assessmentData.assessmentName,
                statusIndagine: 0
            });
        }

        return response;
    },

    /**
     * Aggiorna lo stato dell'indagine
     * @param {number} status - Nuovo stato dell'indagine (0-4)
     * @returns {Promise} Risposta API
     */
    updateStatus: async (status) => {
        return AxiosInstance.post('/api/set_statusIndagine/', {
            statusIndagine: status
        });
    },

    /**
     * Ottiene lo stato corrente dell'indagine
     * @returns {Promise} Risposta API con lo stato
     */
    getStatus: async () => {
        return AxiosInstance.get('/api/get_statusIndagine/');
    }
};

// Esportiamo sia l'istanza Axios che il SessionManager
export { SessionManager };
export default AxiosInstance;