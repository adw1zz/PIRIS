import React from "react";
import { Routes, Route } from 'react-router-dom';
import Clients from '../pages/Clients';

const Router = () => {
    return (
        <Routes>
            <Route path="/clients" element={<Clients />} />
        </Routes>
    )
}

export default Router;