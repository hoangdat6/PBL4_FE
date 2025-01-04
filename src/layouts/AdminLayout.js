import React, {useEffect} from 'react';
import styles from "./MainLayout.module.scss";
import Sidebar from '../components/Sidebar/Sidebar';
import Header from "../components/Header/Header";
import ChatBox from "../components/ChatBox/ChatBox";
import useAdmin from "../hooks/useAdmin";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading/Loading";

const AdminLayout = ({ children }) => {
    const { isAdmin, loading } = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAdmin) {
            navigate('/401');
        }
    }, [isAdmin, loading, navigate]);

    if (loading) {
        return <Loading />;
    }

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