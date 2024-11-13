import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {createRoot} from "react-dom/client";

const router = createBrowserRouter([
    { 
        path: '/',
        element: <App />, 
    },
]);

const root = createRoot(document.getElementById("root")); // Usa createRoot per React 18+
root.render(<RouterProvider router={router} />);
