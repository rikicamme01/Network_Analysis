import React from "react";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";

export default function CustomTextField(props) {
    return (
        <TextField
            {...props}
            label={props.label}
            variant="outlined"
            fullWidth

            sx={{
                width: props.width || 'auto',
                height: props.height || 'auto',
                "& .MuiOutlinedInput-root": {
                    fontSize: props.fontSize || '17px',
                    fontFamily: props.fontFamily || 'Roboto, sans-serif',
                    "& fieldset": {
                        borderColor: props.borderColor || 'gray', // Colore normale
                    },
                    "&:hover fieldset": {
                        borderColor: props.hoverBorderColor || '#A9C4EB', // Colore al hover
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: props.focusBorderColor || '#22509C', // Colore al focus
                    },
                },

            }}
        />
    );
}