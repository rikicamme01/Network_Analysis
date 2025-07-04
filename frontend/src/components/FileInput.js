import React from 'react';
import { MuiFileInput } from 'mui-file-input';

export default function FileInput({ handleValueChange, error }) {
    const [value, setValue] = React.useState(null);

    const handleChange = (newValue) => {
        if (newValue && newValue !== "") {
            const allowedFormats = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
            if (allowedFormats.includes(newValue.type)) {
                setValue(newValue);
                handleValueChange(newValue, false); // Nessun errore
            } else {
                setValue(null);
                handleValueChange(null, true); // Errore di formato
            }
        } else {
            console.log("File input vuoto, mantenendo il file precedente");
        }
    };

    return (
        <MuiFileInput
            value={value}
            onChange={handleChange}
            placeholder="Seleziona il file .xlsx"
            //title="Carica File"
            error={error} // Rimuovi gestione errore dal figlio
            helperText={error && 'Formato file non supportato'}
            sx={{
                width: '400px',
                '& .MuiInputBase-root': {
                    height: '60px',
                    borderRadius: '8px',
                    backgroundColor: '#f0f0f0',
                    '&:hover': {
                        backgroundColor: '#CCCCCC',
                        border: '1px solid #22509c',
                    },
                },
                '& .MuiInputBase-input': {
                    fontSize: '18px',
                    color: '#555',
                },
            }}
        />
    );
}

FileInput.defaultProps = {
    error: false,
};