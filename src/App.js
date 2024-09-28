import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./assets/statics/bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/common.css";
import "./styles/css/main.css";
import "./styles/css/typograply.css";
import './styles/scss/main.scss';
import './assets/font-awesome-6-pro/font-awesome-6-pro/css/all.min.css';
import Content from "./pages/Content/Content";
import CaroBoard from "./components/CaroBoard/CaroBoard";
import MainPage from "./pages/MainPage";
import {useSelector} from "react-redux";

function App() {
    const isDarkMode = useSelector(state => state.darkMode.isDarkMode);
    console.log(isDarkMode);

    if(isDarkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    }else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }

    return (
        <div>
            <Router>
                <Routes>
                    {/* Sử dụng element và truyền JSX element */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/room/:roomId" element={<CaroBoard />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
