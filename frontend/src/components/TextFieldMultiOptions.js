import React, { useEffect, useState } from "react";
import CustomTextField from "./CustomTextField"; // o il path corretto
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function TextFieldMultiOptions({ onChange, value }) {
    const [fields, setFields] = useState(Array.isArray(value) ? value : [""]);

    useEffect(() => {
        if (Array.isArray(value)) {
            setFields(value);
        }
    }, [value]);

    const addField = () => {
        const newFields = [...fields, ""];
        setFields(newFields);
    };

    const updateField = (index, newValue) => {
        const newFields = [...fields];
        newFields[index] = newValue;
        setFields(newFields);

        const filteredFields = newFields.filter((field) => field.trim() !== "");
        onChange(filteredFields);
    };

    return (
        <div style={{ width: "100%", maxWidth: "500px" }}>
            {fields.map((value, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <CustomTextField
                        value={value}
                        width="600px"
                        onChange={(e) => updateField(index, e.target.value)}
                    />
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
