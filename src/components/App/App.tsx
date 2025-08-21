// Компонент App — головний компонент додатку.
// Основне:
// - Керує станом пошуку: масив фільмів, індикатор завантаження, стан помилки.
// - Викликає сервіс fetchMovies для отримання результатів пошуку.
// - Відображає SearchBar, Loader, ErrorMessage, MovieGrid та MovieModal.
// - handleSearch: асинхронний запит, обробка помилок та повідомлень через toast.
// - handleSelectMovie / handleCloseModal: управління відкриттям модального вікна.
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import styles from "./App.module.css";

const App = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    // Ефект для плавного скролу при додаванні нових фільмів
    useEffect(() => {
        if (page > 1) {
            window.scrollBy({
                top: 520, // Можна налаштувати
                behavior: "smooth",
            });
        }
    }, [movies, page]);

    const handleSearch = async (newQuery: string): Promise<void> => {
        if (newQuery === query) return;

        setQuery(newQuery);
        setPage(1);
        setMovies([]);
        setTotalPages(0);
        setError(false);

        try {
            setIsLoading(true);
            const { movies: data, totalPages: newTotalPages } =
                await fetchMovies(newQuery, 1);
            if (data.length === 0) {
                toast.error("No movies found for your request.", {
                    position: "top-center",
                });
            }
            setMovies(data);
            setTotalPages(newTotalPages);
        } catch {
            setError(true);
            toast.error("There was an error, please try again...");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = async (): Promise<void> => {
        const nextPage = page + 1;
        try {
            setIsLoading(true);
            const { movies: data } = await fetchMovies(query, nextPage);
            setMovies((prevMovies) => [...prevMovies, ...data]);
            setPage(nextPage);
        } catch {
            setError(true);
            toast.error("There was an error, please try again...");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectMovie = (movie: Movie): void => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = (): void => {
        setSelectedMovie(null);
    };

    const showLoadMore = movies.length > 0 && page < totalPages;

    return (
        <div className={styles.app}>
            <Toaster position="top-right" />
            <SearchBar onSubmit={handleSearch} />

            {movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={handleSelectMovie} />
            )}

            {isLoading && <Loader />}
            {error && !isLoading && <ErrorMessage />}

            {showLoadMore && !isLoading && (
                <LoadMoreButton onClick={handleLoadMore} />
            )}

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default App;
