import React from "react";
import DefaultLayout from "./DefaultLayout";
import MainLayout from "./MainLayout";
import MainLayoutWithFooter from "./MainLayoutWithFooter";

const layouts = {
    default: DefaultLayout,
    mainPage: MainLayout,
    mainPageWithFooter: MainLayoutWithFooter,
};

const LayoutWrapper = ({ layoutType = "default", children }) => {
    // Lấy layout dựa vào layoutType
    const Layout = layouts[layoutType] || DefaultLayout;

    return <Layout>{children}</Layout>;
};

export default LayoutWrapper;
