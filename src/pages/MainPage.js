import Sidebar from "../components/Sidebar/Sidebar";
import Content from "./Content/Content";


const MainPage = () => {
    return (
        <div className={`main_page d-flex flex-grow-1`}
             style={{
                 backgroundColor: 'var(--bg-color-dark)',
             } }>
            <Sidebar />
            <Content className={`flex-grow-1`}/>
        </div>
    );
}

export default MainPage;