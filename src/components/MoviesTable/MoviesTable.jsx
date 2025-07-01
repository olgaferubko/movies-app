import MovieRow from '../MovieRow/MovieRow';
import s from './MoviesTable.module.css';

const MoviesTable = ({
  movies,
  searchTerm = '',
  onDelete,
  onOpenDetails,
  isLoading,
  detailLoading
}) => {

  if (!isLoading && searchTerm && movies.length === 0) {
    return (
      <div className={s.empty}>
        Nothing found
      </div>
    );
  }

  if (!isLoading && !searchTerm && movies.length === 0) {
    return (
      <div className={s.empty}>
        It's empty here — add your movies
      </div>
    );
  }

  return (
    <div className={s.tableWrapper}>
      <table className={s.movieTable}>
        <thead>
          <tr className={s.columnWrapper}>
            <th className={s.tableColumn}>Title</th>
            <th className={s.tableColumn}>Year</th>
            <th className={s.tableColumn}>Format</th>
            <th className={s.tableColumnActions}>Actions</th>
          </tr>
        </thead>
        <tbody className={s.tableBody}>
          {movies.map(movie => (
            <MovieRow
              key={movie.id}
              movie={movie}
              onDelete={onDelete}
              onOpenDetails={onOpenDetails}
              isLoading={isLoading}
              detailLoading={detailLoading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoviesTable;