
// mode: infinity, limit
// timeInit: is the time received from the server
// in the infinity mode timeInit up to
// in the limit mode timeInit down from init time to zero
    // if timeinit == 0, this player won
import {useState} from "react";

const useTimer = ({ playMode, playTimeInit,  }) => {

    const [timeInit, setTimeInit] = useState(playTimeInit);
    const [mode, setMode] = useState(playMode);

    //
    const counter = () => {

    }
}