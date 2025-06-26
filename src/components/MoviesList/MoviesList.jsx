import { useSelector, useDispatch } from 'react-redux';
import { deleteMovie, setSortBy } from '../../redux/movies/slice';
import { selectMovies, selectSearchQuery, selectSortBy } from '../../redux/movies/selectors';

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const searchQuery = useSelector(selectSearchQuery).toLowerCase();
  const sortBy = useSelector(selectSortBy);

  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(searchQuery);
    const actorMatch = movie.actors.some((actor) =>
      actor.toLowerCase().includes(searchQuery)
    );
    return titleMatch || actorMatch;
  });

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleSortChange = (e) => {
  dispatch(setSortBy(e.target.value));
};

const sortedMovies = [...filteredMovies].sort((a, b) => {
  return sortBy === 'asc'
    ? a.title.localeCompare(b.title)
    : b.title.localeCompare(a.title);
});

  return (
    <div>
      <h2>Movies list</h2>
      <div>
        <label htmlFor="sort">Sort by title:</label>{' '}
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
          <ul>
            {sortedMovies.map(({ id, title, year, format, actors }) => (
              <li key={id}>
                <p>{title}</p> ({year}) — {format}
                <br />
                Actors: {actors.join(', ')}
                <br />
                <button onClick={() => handleDelete(id)}>Delete</button>
              </li>
            ))}
          </ul>
    </div>
  );
};

export default MoviesList;
