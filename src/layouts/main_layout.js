import React from 'react';
import styles from "./MainLayout.module.scss";
const Sidebar = React.lazy(() => import('../components/Sidebar/Sidebar'));
const Header = React.lazy(() => import('../components/Header/Header'));

const MainLayout = ({ children }) => {
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
                </div>
            </div>
        </div>
    );
}

export default MainLayout;