import { useState, useEffect } from "react";

const useTimer = (initialTime) => {
    const [timer, setTimer] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = (time) => {
        setTimer(time);
        setIsRunning(true);
    };

    const resetTimer = (time) => {
        setTimer(time);
        setIsRunning(false); // Reset trạng thái chạy để đảm bảo interval không bị kích hoạt
    };

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(interval); // Dừng interval khi timer đạt 0
                        setIsRunning(false); // Dừng đồng hồ
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(interval); // Dọn dẹp interval cũ khi unmount hoặc isRunning thay đổi
    }, [isRunning]);

    return { timer, startTimer, resetTimer };
};

export default useTimer;
