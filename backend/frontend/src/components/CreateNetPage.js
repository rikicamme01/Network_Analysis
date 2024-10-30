import React, {Component} from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/system/typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material";
import RadioGroup from "@mui/material";
import FormControlLabel from "@mui/material";



export default function CreateNetPage(props){
    const defaultVotes = 3;
    const createAssesment = () => {
        pass
    };

    return (
        <Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type ='number' />
                </FormControl>


            </Grid>
        </Grid>
    );
}