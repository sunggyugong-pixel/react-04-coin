import { useState } from 'react';
import './App.css';

function App() {
    // 입력 폼 상태 관리
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('드라마');
    const [rating, setRating] = useState(5);

    // 영화 목록 상태 관리
    const [movies, setMovies] = useState([]);

    // 장르 5가지 옵션
    const genres = ['드라마', '액션', 'SF', '코미디', '스릴러'];

    // 영화 추가
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newMovie = {
            id: Date.now(),
            title,
            genre,
            rating: Number(rating),
            watched: false, // 감상 완료 여부
        };

        setMovies([newMovie, ...movies]);
        setTitle('');
        setGenre('드라마');
        setRating(5);
    };

    // 삭제
    const handleDelete = (id) => {
        setMovies(movies.filter((movie) => movie.id !== id));
    };

    // 감상 완료 토글 (체크박스)
    const handleToggleWatched = (id) => {
        setMovies(
            movies.map((movie) =>
                movie.id === id ? { ...movie, watched: !movie.watched } : movie
            )
        );
    };

    // 별점 ★ 표시 변환 함수
    const renderStars = (count) => {
        return '★'.repeat(count) + '☆'.repeat(5 - count);
    };

    // 통계 계산
    const totalCount = movies.length;
    const watchedCount = movies.filter((m) => m.watched).length;

    return (
        <div className="container">
            <h1>나의 영화 기록장</h1>

            {/* 영화 추가 입력 폼 */}
            <fieldset className="add-fieldset">
                <legend>영화 추가</legend>
                <form onSubmit={handleSubmit} className="add-form">
                    <input
                        type="text"
                        placeholder="영화 제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        {genres.map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </select>

                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        <option value={1}>별점 1점</option>
                        <option value={2}>별점 2점</option>
                        <option value={3}>별점 3점</option>
                        <option value={4}>별점 4점</option>
                        <option value={5}>별점 5점</option>
                    </select>

                    <button type="submit">추가</button>
                </form>
            </fieldset>

            {/* 전체 / 감상 완료 통계 */}
            <h3 className="stats">
                전체 {totalCount}편 / 감상 완료 {watchedCount}편
            </h3>

            {/* 영화 카드 목록 (그리드 레이아웃) */}
            <div className="movie-grid">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className={`movie-card ${movie.watched ? 'watched' : ''}`}
                    >
                        <h4>{movie.title}</h4>
                        <p className="genre">장르: {movie.genre}</p>
                        <p className="stars">{renderStars(movie.rating)}</p>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={movie.watched}
                                onChange={() => handleToggleWatched(movie.id)}
                            />
                            감상 완료
                        </label>

                        <div>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(movie.id)}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;