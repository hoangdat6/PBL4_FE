import { useState, useEffect, useRef } from "react";

const useTimer = (initialTime) => {
    const [timer, setTimer] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = (time = initialTime) => {
        setTimer(time);
        setIsRunning(true);
    };

    const resetTimer = (time = initialTime) => {
        clearInterval(intervalRef.current); // Dừng interval khi reset
        setTimer(time);
        setIsRunning(false);
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(intervalRef.current); // Dừng timer
                        setIsRunning(false);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(intervalRef.current); // Dọn dẹp interval khi unmount hoặc isRunning thay đổi
    }, [isRunning]);

    return { timer, startTimer, resetTimer, isRunning };
};

export default useTimer;
