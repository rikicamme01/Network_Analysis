import React from "react";

export default function MainReport() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Report</h1>
            <p>
                Clicca qui per visualizzare il report in formato PDF:
            </p>
            <a 
                href="http://localhost:8000/static/Report_user_RETI.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                    textDecoration: "none",
                    color: "blue",
                    fontWeight: "bold"
                }}
            >
                Scarica il Report
            </a>
        </div>
    );
}
