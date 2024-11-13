import React, {Component} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExamplePage from '../pages/ExamplePage';
import Login from "../pages/Login";
import NewAss from  "../pages/NewAss";
import AdminSurvey from  "../pages/AdminSurvey";
import Questionari from  "../pages/Questionari";
import ReportLoading from  "../pages/ReportLoading";
import ReportFinal from  "../pages/ReportFinal";

export default function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/newAss" element={<NewAss />} />
                <Route path="/adminSurvey" element={<AdminSurvey />} />
                <Route path="/questionari" element={<Questionari />} />
                <Route path="/reportLoading" element={<ReportLoading />} />
                <Route path="/reportFinal" element={<ReportFinal />} />
            </Routes>
        </BrowserRouter>
    );
}