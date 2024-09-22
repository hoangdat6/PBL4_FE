import Sidebar from "../components/Sidebar/Sidebar";
import Content from "./Content/Content";


const MainPage = () => {
    return (
        <div className={`d-flex flex-grow-1`}>
            <Sidebar />
            <Content className={`flex-grow-1`}/>
        </div>
    );
}

export default MainPage;