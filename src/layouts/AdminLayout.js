import React from 'react';
import styles from "./MainLayout.module.scss";
import Sidebar from '../components/Sidebar/Sidebar';
import Header from "../components/Header/Header";
import ChatBox from "../components/ChatBox/ChatBox";

const AdminLayout = ({ children }) => {
    return (

        <div className={`main_page d-flex flex-grow-1`}
             style={{
                 backgroundColor: 'var(--bg-color-dark)',
             }}>
            <Sidebar layout={"admin"}/>
            <div className={`${styles.content} flex-grow-1`}>
                <Header layout={"admin"}/>
                <div className={`${styles.test} flex-grow-1`}>
                    {children}
                </div>
            </div>

        </div>
    );
}

export default AdminLayout;