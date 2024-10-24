import React, {Component} from "react";
import {createRoot} from "react-dom/client";
import Message from '.Message';

export default function App() {
    return <h1>Testing React Code</h1>;
}
//return <div><Message/></div>

const appDiv = document.getElementById("app");

const root = createRoot(appDiv); // Usa createRoot per React 18+
root.render(<App />);