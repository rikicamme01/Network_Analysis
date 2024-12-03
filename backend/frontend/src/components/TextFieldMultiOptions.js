import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomTextField from "./CustomTextField";

export default function TextFieldMultiOptions() {
    const [fields, setFields] = useState([""]); // Array di textfields inizialmente con un elemento

    const addField = () => {
        setFields([...fields, ""]); // Aggiunge un nuovo campo vuoto
    };

    return (
        <div style={{ width: "100%", maxWidth: "500px" }}>
            {fields.map((value, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <CustomTextField value={value} width="600px" />
                </div>
            ))}

            <div
                onClick={addField}
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    cursor: "pointer",
                }}
            >
                <AddCircleIcon style={{ color: "#22509C", marginRight: "8px" }} />
                <span className="span-aggiungi-risposta">Aggiungi risposta</span>
            </div>
        </div>
    );
}
