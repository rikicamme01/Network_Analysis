import React, { createContext, useContext, useEffect, useState } from "react";

// Crea il Context
const Context = createContext();

// Crea il Provider
export const OutputProvider = ({ children }) => {
    const [output, setOutput] = useState(false); // Stato locale
    //const [loading, setLoading] = useState(true); // Stato di caricamento
    //const [error, setError] = useState(null); // Stato per gli errori

    // Funzione per recuperare lo stato dal database (simulata con fetch)
    /*const fetchOutput = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/getUserState"); // API per ottenere lo stato
            if (!response.ok) throw new Error("Errore nel recupero dello stato");
            const data = await response.json();
            setOutput(data.output); // Imposta lo stato
            setError(null); // Resetta eventuali errori
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };*/

    // Funzione per aggiornare lo stato nel database
    const updateOutput = async (newOutput) => {
        setOutput(newOutput); // Aggiorna immediatamente lo stato locale
        /*try {
            const response = await fetch("/api/updateUserState", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ output: newOutput }),
            });
            if (!response.ok) throw new Error("Errore nel salvataggio dello stato");
            setError(null);
        } catch (err) {
            setError(err.message);
        }*/
    };

    // Recupera lo stato dal database all'inizializzazione del provider
    /*useEffect(() => {
        fetchOutput();
    }, []);*/

    // Ritorna il provider con lo stato condiviso
    return (
        <Context.Provider
            value={{
                output,
                setOutput: updateOutput, // Funzione per aggiornare lo stato
                //loading,
                //error,
            }}
        >
            {children}
        </Context.Provider>
    );
};

// Custom hook per accedere al context
export const useOutput = () => useContext(Context);
