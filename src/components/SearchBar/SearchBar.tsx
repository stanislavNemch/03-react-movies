// Компонент пошукової панелі.
// Основне:
// - Керує сабмітом форми, валідує поле (не порожнє).
// - Викликає onSubmit(query) для пошуку фільмів.
// - Показує зовнішнє посилання на TMDB, містить інпут та кнопку.
import type { FormEvent, JSX } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps): JSX.Element => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const form = event.currentTarget;
        const query = (form.elements.namedItem("query") as HTMLInputElement)
            .value;

        if (query.trim() === "") {
            toast.error("Please enter your search query.");
            return;
        }

        onSubmit(query);
        form.reset();
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
};

export default SearchBar;
