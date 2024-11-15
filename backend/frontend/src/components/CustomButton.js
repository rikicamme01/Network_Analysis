import React from "react";
import { Button } from '@mui/material';
import "../../static/css/style.css"

export default function CustomButton(props) {
    return (
        <Button
            variant="contained" // Tipo di bottone, "contained" per uno stile pieno
            color="primary" // Colore predefinito, può essere "primary", "secondary", "error", etc.
            sx={{
                fontSize: '20px', // Imposta la dimensione del font
                fontFamily: 'Roboto, sans-serif', // Imposta il font
                padding: '10px 20px', // Imposta la dimensione del padding (spaziatura interna)
                borderRadius: '8px', // Rende gli angoli arrotondati
                textTransform: 'none', // Disabilita la trasformazione del testo (in genere tutto in maiuscolo)
                backgroundColor: '#22509C', // Colore di sfondo personalizzato
                '&:hover': { // Stile per il bottone al passaggio del mouse (hover)
                    backgroundColor: '#A9C4EB',
                },
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Aggiunge un'ombra al bottone
                width: props.width || 'auto',
                height: props.height || '60px',
            }}
        >
            {props.text}
        </Button>
    );

}