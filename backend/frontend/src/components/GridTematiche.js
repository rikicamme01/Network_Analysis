import React, { useState } from "react";

import "../../static/css/gridTematiche.css"
import CustomButton from "./CustomButton";


const gridOption = ["Gender Gap", "Sostenibilità", "Stress lavorativo correlato",
    "Diversity and Inclusion", "Wellbeing", "Burn out", "Conciliazione vita-lavoro",
    "Lavoro di squadra", "Sviluppo professionale"]

export default function GridTematiche() {
    const [selected, setSelected] = useState(null);

    const handleSelect = (index) => {
        setSelected(index);
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
