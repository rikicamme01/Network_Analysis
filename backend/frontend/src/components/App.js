import React, {Component} from "react";
import {createRoot} from "react-dom/client";
import CreateNetPage from './CreateNetPage';

export default function App(props) {
    return <CreateNetPage />;
}

const appDiv = document.getElementById("app");

const root = createRoot(appDiv); // Usa createRoot per React 18+
root.render(<App />);