import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import Footer from "./Footer/Footer";
import AboutCaro from "./AboutCaro/AboutCaro";
import StaticChatBubble from "../ChatBubble/ChatBubble";
import React from "react";
import ChatBubble from "../ChatBubble/ChatBubble";


const HomePage = () => {
    return (
        <>
            <Hero />
            <Features />
            <AboutCaro />
            <Footer />
            <ChatBubble />
        </>
    )
}

export default HomePage