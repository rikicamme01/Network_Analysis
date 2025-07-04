import React, { useState, useEffect } from "react";

import "../../static/css/gridTematiche.css"
import CustomButton from "./CustomButton";


const gridOption = ["Gender Gap", "Sostenibilità", "Stress lavorativo correlato",
    "Diversity and Inclusion", "Wellbeing", "Burn out", "Conciliazione vita-lavoro",
    "Lavoro di squadra", "Sviluppo professionale"]

export default function GridTematiche({ onSelect, value }) {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const index = gridOption.indexOf(value);
        if (index !== -1) {
            setSelected(index);
        }
    }, [value]); // Esegui l'effetto ogni volta che value cambia

    const handleSelect = (index) => {
        setSelected(index);
        onSelect(gridOption[index])
    };

    return (
        <div className="grid-container">
            {gridOption.map((label, index) => (
                <CustomButton
                    text={label}
                    key={index}
                    className={`grid-button ${selected === index ? "selected" : ""}`}
                    onClick={() => handleSelect(index)}
                    fontSize='17px'
                />
            ))}
        </div>
    );
};
