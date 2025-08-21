import type { JSX } from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = (): JSX.Element => {
    return (
        <p className={styles.text}>There was an error, please try again...</p>
    );
};

export default ErrorMessage;
