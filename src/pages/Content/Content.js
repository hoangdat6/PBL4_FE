import Header from "../../components/Header/Header";
import styles from "./Content.module.scss";

const Content = ({className}) => {
    return (
        <div className={`${styles.content} ${className}`}>
            <Header/>
            <div className={`${styles.test}`}>

            </div>
        </div>
    )
}

export default Content;