import React, { useState } from "react";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import CustomButton from "../CustomButton";

export default function Filter_graph(ruoli) {

    const [selectedRole, setSelectedRole] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
    });
    const [selectedGender, setSelectedGender] = useState({
        uomo: false,
        donna: false,
        altro: false,
    });
    const [selectedAge, setSelectedAge] = useState({

    });


    const handleChange = (event) => {
        setSelectedRole({
            ...selectedRole,
            [event.target.name]: event.target.checked,
        });
        setSelectedGender({
            ...selectedGender,
            [event.target.name]: event.target.checked,
        });
        setSelectedAge({
            ...selectedAge,
            [event.target.name]: event.target.checked,
        });
    };

    const marks = [
        { value: 18, label: '18' },
        { value: 25, label: '25' },
        { value: 30, label: '30' },
        { value: 35, label: '35' },
        { value: 40, label: '40' },
        { value: 50, label: '50' },
        { value: 60, label: '60' },
        { value: 70, label: '70' },
        { value: 80, label: '>70' },
    ];

    // Stato per i valori selezionati
    const [age, setAge] = useState([18, 80]);
    const handleChangeAge = (event, newValue) => {
        setAge(newValue);
    };


    return (
        <div className="div-filtro">
            <div className="row-filtro">
                <div className="div-tipo-filtro">
                    <p>Ruolo:</p>

                </div>
                <div className="div-selector">
                    <FormControl component="fieldset">
                        <FormGroup row sx={{ gap: 0 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedRole.option1}
                                        onChange={handleChange}
                                        name="option1"
                                        sx={{
                                            transform: "scale(0.8)",
                                            color: "gray",
                                            "&.Mui-checked": { color: "#22509C" }
                                        }}
                                    />
                                }
                                label="Opzione 1"
                                sx={{ "& .MuiTypography-root": { fontSize: "15px", fontFamily: "'Roboto', sans-serif" } }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedRole.option2}
                                        onChange={handleChange}
                                        name="option2"
                                        sx={{
                                            transform: "scale(0.8)",
                                            color: "gray",
                                            "&.Mui-checked": { color: "#22509C" }
                                        }}
                                    />
                                }
                                label="Opzione 2"
                                sx={{ "& .MuiTypography-root": { fontSize: "15px", fontFamily: "'Roboto', sans-serif" } }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedRole.option3}
                                        onChange={handleChange}
                                        name="option3"
                                        sx={{
                                            transform: "scale(0.8)",
                                            color: "gray",
                                            "&.Mui-checked": { color: "#22509C" }
                                        }}
                                    />
                                }
                                label="Opzione 3"
                                sx={{ "& .MuiTypography-root": { fontSize: "15px", fontFamily: "'Roboto', sans-serif" } }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedRole.option4}
                                        onChange={handleChange}
                                        name="option4"
                                        sx={{
                                            transform: "scale(0.8)",
                                            color: "gray",
                                            "&.Mui-checked": { color: "#22509C" }
                                        }}
                                    />
                                }
                                label="Opzione 4"
                                sx={{ "& .MuiTypography-root": { fontSize: "15px", fontFamily: "'Roboto', sans-serif" }, }}
                            />
                        </FormGroup>
                    </FormControl>


                </div>

            </div>
            <div className="row-filtro">
                <div className="div-tipo-filtro">
                    <p>Gender:</p>

                </div>
                <div className="div-selector">
                    <FormControl component="fieldset">
                        <FormGroup row sx={{ gap: 0 }}> {/* Aggiunge spaziatura tra gli elementi */}
                            <FormControlLabel
                                control={<Checkbox checked={selectedGender.option1} onChange={handleChange} name="uomo" sx={{
                                    transform: "scale(0.8)", color: "grey",
                                    "&.Mui-checked": { color: "#22509C" }
                                }} />}
                                label="Uomo"
                                sx={{ "& .MuiTypography-root": { fontSize: "15px", fontFamily: "'Roboto', sans-serif" } }}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={selectedGender.option1} onChange={handleChange} name="donna" sx={{
                                    transform: "scale(0.8)", color: "grey",
                                    "&.Mui-checked": { color: "#22509C" }
                                }} />}
                                label="Donna"
                                sx={{ "& .MuiTypography-root": { fontSize: "15px", fontFamily: "'Roboto', sans-serif" } }}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={selectedGender.option1} onChange={handleChange} name="altro" sx={{
                                    transform: "scale(0.8)", color: "grey",
                                    "&.Mui-checked": { color: "#22509C" }
                                }} />}
                                label="Altro"
                                sx={{ "& .MuiTypography-root": { fontSize: "15px", fontFamily: "'Roboto', sans-serif" } }}
                            />
                        </FormGroup>
                    </FormControl>

                </div>

            </div>
            <div className="row-filtro">
                <div className="div-tipo-filtro">
                    <p>Età:</p>

                </div>
                <div className="div-selector">
                    <Slider
                        value={age}
                        onChange={handleChangeAge}
                        valueLabelFormat={(age) => `${age}`}
                        min={18}
                        max={80}
                        step={null} // step è null per permettere solo i valori specificati
                        marks={marks} // Imposta i valori come "mark" per lo slider
                        sx={{
                            width: '85%',
                            margin: '10px',
                            '& .MuiSlider-track': {
                                backgroundColor: '#22509C', // Colore della traccia
                            },
                            '& .MuiSlider-thumb': {
                                backgroundColor: '#22509C', // Colore del cursore
                                width: 15, // Dimensione del cursore
                                height: 15, // Dimensione del cursore
                            }
                        }} // Imposta la larghezza del componente
                        valueLabelDisplay="off"
                    />
                </div>

            </div>
            <div className="row-filtro-filtra">
                <CustomButton

                    text='Filtra'
                    fontSize='16px'
                    height='38px'
                />
            </div>
        </div>
    )
}