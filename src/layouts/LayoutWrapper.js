// LayoutWrapper.js
import React from "react";
import DefaultLayout from "./default_layout";
import MainLayout from "./main_layout";

const layouts = {
    default: DefaultLayout,
    mainPage: MainLayout,
};

const LayoutWrapper = ({ layoutType = "default", children }) => {
    // Lấy layout dựa vào layoutType
    const Layout = layouts[layoutType] || DefaultLayout;

    return <Layout>{children}</Layout>;
};

export default LayoutWrapper;
