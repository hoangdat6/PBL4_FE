import Header from "../../components/Header/Header";
import styles from "./Content.module.scss";
import HomePage from "../../components/HomePage/HomePage";

const Content = ({className}) => {
    return (

        <div className={`${styles.content} ${className}`}>
            <Header/>
            <div className={`${styles.test} flex-grow-1`}>
                <HomePage/>
            </div>
        </div>
    )
}

export default Content;