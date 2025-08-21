import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

// Інтерфейс для відповіді від TMDB API
interface TmdbResponse {
    results: Movie[];
    total_pages: number;
}

// Створюємо екземпляр axios з базовими налаштуваннями
const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
});

/**
 * Функція для пошуку фільмів за ключовим словом та сторінкою.
 * @param query - Рядок для пошуку.
 * @param page - Номер сторінки для завантаження.
 * @returns Проміс, що повертає об'єкт з масивом фільмів та загальною кількістю сторінок.
 */
export const fetchMovies = async (
    query: string,
    page: number
): Promise<{ movies: Movie[]; totalPages: number }> => {
    const response: AxiosResponse<TmdbResponse> = await apiClient.get(
        "/search/movie",
        {
            params: {
                query,
                page,
            },
        }
    );
    return {
        movies: response.data.results,
        totalPages: response.data.total_pages,
    };
};
