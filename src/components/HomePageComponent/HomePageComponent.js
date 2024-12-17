import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import AboutCaro from "./AboutCaro/AboutCaro";
import React from "react";

const HomePageComponent = () => {
    return (
        <>
            <Hero />
            <Features />
            <AboutCaro />
            {/*<ChatBubble />*/}
        </>
    )
}

export default HomePageComponent;