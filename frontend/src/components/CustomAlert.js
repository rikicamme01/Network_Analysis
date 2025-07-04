import React from "react";
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


export default function CustomAlert(props) {
    return (
        <Alert variant="outlined" severity="success" icon={<CheckCircleOutlineIcon sx={{ fontSize: 25 }} />}
            style={{
                height: props.width || '40px', // Altezza personalizzata
                width: props.height || '250px',  // Larghezza personalizzata
                display: 'flex', // Per gestire il contenuto centralmente
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Roboto, sans-serif', // Modifica il font
                fontSize: '17px',
                border: '2px solid ##91C58A',
            }}
        >
            {props.text}
        </Alert>);
}