import { useEffect } from 'react';

function useViewportHeight() {
    useEffect(() => {
        function setAppHeight() {
            const appHeight = window.innerHeight;
            document.documentElement.style.setProperty('--app-height', `${appHeight}px`);
        }

        setAppHeight(); // Set height on load
        window.addEventListener('resize', setAppHeight); // Update on resize

        return () => window.removeEventListener('resize', setAppHeight); // Cleanup on unmount
    }, []);
}

export default useViewportHeight;