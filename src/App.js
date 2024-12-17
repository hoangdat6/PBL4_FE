import React, {useEffect} from 'react';
import "./assets/statics/bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/common.css";
import "./styles/css/main.css";
import "./styles/css/typograply.css";
import './styles/scss/main.scss';
import './assets/font-awesome-6-pro/font-awesome-6-pro/css/all.min.css';
import {useDispatch, useSelector} from "react-redux";
import { initialize } from './store/slices/authSlice';
import AppRoutes from "./AppRoutes";
import './assets/statics/animate.css';

function App() {
    const isDarkMode = useSelector(state => state.darkMode.isDarkMode);

    if(isDarkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    }else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    return (
            <AppRoutes/>
    );
}

export default App;
