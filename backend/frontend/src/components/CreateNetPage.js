import React, {Component} from "react";

export default function CreateNetworkPage(props){
    // Definisci lo stato per il contatore
    const [count, setCount] = useState(0);

    // Funzione per gestire il click del pulsante
    const handleButtonClick = () => {
        setCount(count + 1);  // Incrementa il contatore
    };

    return (
        <div>
            <h1>Contatore: {count}</h1>
            <button onClick={handleButtonClick}>Incrementa</button>
        </div>
    );
}