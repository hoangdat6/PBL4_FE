import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { useState } from "react";

const SignInSignUp = ({ Overlay, toggleOverlay }) => {
    const [isSignInMode, setIsSignInMode] = useState(true);

    const toggleMode = () => {
        setIsSignInMode((prevMode) => !prevMode);
    };

    const toggleOverlayCustom = () => {
        toggleOverlay();
        setIsSignInMode(true);
    };

    const renderForm = () => {
        return isSignInMode ? (
            <SignIn toggleOverlay={toggleOverlayCustom} onSignUp={toggleMode} />
        ) : (
            <SignUp toggleOverlay={toggleOverlayCustom} onSignUp={toggleMode} />
        );
    };

    return (
        <div>
            <Overlay
                overlayClickHidden={false}
            >
                {renderForm()}
            </Overlay>
        </div>
    );
}

export default SignInSignUp;
