import React from "react";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";

export default function CustomTextField(props) {
    return (
        <TextField
            label={props.label}
            variant="outlined"
            fullWidth
            sx={{
                width: props.width, // Specifica la larghezza del TextField
                fontSize: props.fontSize, // Font size del contenuto
            }}
        />
    );
}