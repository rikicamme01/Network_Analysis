import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Prova from '../components/Prova';
import ExamplePage from '../pages/ExamplePage';
import Login from "../pages/Login";
import NewAss from "../pages/admin/NewAss";
import AdminSurvey from "../pages/admin/AdminSurvey";
import Questionari from "../pages/admin/Questionari";
import ReportLoading from "../pages/admin/ReportLoading";
import ReportFinal from "../pages/admin/ReportFinal";
import Dashboard from "../pages/analyzer/Dashboard";
import DatabaseAss from "../pages/analyzer/DatabaseAss";
import { OutputProvider } from "./Context";
import "../../static/css/style.css"

export default function App(props) {
    return (
        <OutputProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
                <Routes>
                    <Route path="/" element={<NewAss />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/newAss" element={<NewAss />} />
                    <Route path="/adminSurvey" element={<AdminSurvey />} />
                    <Route path="/questionari" element={<Questionari />} />
                    <Route path="/reportLoading" element={<ReportLoading />} />
                    <Route path="/reportFinal" element={<ReportFinal />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/databaseAss" element={<DatabaseAss />} />

                </Routes>
            </BrowserRouter>
        </OutputProvider>
    );
}