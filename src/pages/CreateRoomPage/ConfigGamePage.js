import ConfigGame from "../../components/ConfigGame/ConfigGame";
import useCreateRoom from "../../hooks/useCreateRoom";

const CreateRoomPage = ({isOpen, setIsOpen}) => {
    return (
        <ConfigGame isOpen={isOpen} setIsOpen={setIsOpen} {...useCreateRoom()}/>
    )
};

export default CreateRoomPage;