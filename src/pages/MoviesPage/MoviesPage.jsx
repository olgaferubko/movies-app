import MoviesList from '../../components/MoviesList/MoviesList';
import LogoutBtn from '../../components/LogoutBtn/LogoutBtn';
import s from './MoviesPage.module.css'

const MoviesPage = () => {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1 className={s.heading}>MovieShelf</h1>
        <LogoutBtn />
      </header>
      <MoviesList />
    </div>
  );
};

export default MoviesPage;