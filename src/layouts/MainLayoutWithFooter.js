import React from 'react';
import styles from "./MainLayout.module.scss";
import Sidebar from '../components/Sidebar/Sidebar';
import Header from "../components/Header/Header";
import Footer from "../components/HomePageComponent/Footer/Footer";

const MainLayoutWithFooter = ({ children }) => {
    return (

        <div className={`main_page d-flex flex-grow-1`}
             style={{
                 backgroundColor: 'var(--bg-color-dark)',
             }}>
            <Sidebar/>
            <div className={`${styles.content} flex-grow-1`}>
                <Header/>
                <div className={`${styles.test} flex-grow-1`}>
                    {children}
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default MainLayoutWithFooter;