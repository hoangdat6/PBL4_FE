import SignIn from "../../components/LoginSignUp/SignIn/SignIn";
import SignUp from "../../components/LoginSignUp/SignUp/SignUp";
import { useState } from "react";

const SignInSignUp = ({ Overlay, toggleOverlay, handleLoginSuccess }) => {
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
