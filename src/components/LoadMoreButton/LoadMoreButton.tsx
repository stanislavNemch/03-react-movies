import styles from "./LoadMoreButton.module.css";

interface LoadMoreButtonProps {
    onClick: () => void;
}

const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onClick}>
                Load More
            </button>
        </div>
    );
};

export default LoadMoreButton;
