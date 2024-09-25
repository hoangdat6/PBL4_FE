import Header from "../../components/Header/Header";
import styles from "./Content.module.scss";
import CaroBoard from "../../components/CaroBoard/CaroBoard";

const Content = ({className}) => {
    return (

        <div className={`${styles.content} ${className}`}>
            <Header/>
            <div className={`${styles.test} flex-grow-1`}>
                <CaroBoard/>
            </div>
        </div>
    )
}

export default Content;