import {useState} from "react";


const PlayWithSomeone = () => {
    const [isStarrted, setIsStarted] = useState(false);


    const renderComponent = () => {
        if (!isStarrted) {

        }
    }

    return (
        <div>
            PlayWithSomeone
        </div>
    )
}

export default PlayWithSomeone;