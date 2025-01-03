import React from "react";
import DefaultLayout from "./DefaultLayout";
import MainLayout from "./MainLayout";
import MainLayoutWithFooter from "./MainLayoutWithFooter";
import AdminLayout from "./AdminLayout";

const layouts = {
    default: DefaultLayout,
    mainPage: MainLayout,
    mainPageWithFooter: MainLayoutWithFooter,
    admin_layout: AdminLayout,
};

const LayoutWrapper = ({ layoutType = "default", children }) => {
    // Lấy layout dựa vào layoutType
    const Layout = layouts[layoutType] || DefaultLayout;

    return <Layout>
        {children}
    </Layout>;
};

export default LayoutWrapper;
