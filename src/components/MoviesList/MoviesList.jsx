import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMovieById, deleteMovie } from '../../redux/movies/operations';
import {
  selectAllMovies,
  selectMoviesLoading,
  selectMoviesError,
} from '../../redux/movies/selectors';
import toast from 'react-hot-toast';

import MovieSearchForm from '../MovieSearchForm/MovieSearchForm';
import MoviesTable from '../MoviesTable/MoviesTable';
import MovieDetailModal from '../MovieDetailModal/MovieDetailModal';

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const isLoading = useSelector(selectMoviesLoading);
  const error = useSelector(selectMoviesError);

  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('');
  const [detailMovie, setDetailMovie] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const buildParams = useCallback(() => {
    const params = {};
    if (order)  { params.sort = 'title'; params.order = order; }
    if (searchTerm)  params.search = searchTerm;
    return params;
  }, [order, searchTerm]);

  useEffect(() => {
    dispatch(fetchMovies(buildParams()))
      .unwrap()
      .catch(err =>
        toast.error(
          typeof err === 'string'
            ? err
            : err.message || String(err)
        )
      );
  }, [dispatch, buildParams]);

  useEffect(() => {
    if (error) {
      const msg = typeof error === 'string'
        ? error
        : error.message || JSON.stringify(error);
      toast.error(msg);
    }
  }, [error]);

  const handleSearch = term => setSearchTerm(term.trim());

  const handleDelete = id => {
    dispatch(deleteMovie(id))
      .unwrap()
      .then(() => {
        toast.success('Movie deleted');
        return dispatch(fetchMovies(buildParams())).unwrap();
      })
      .catch(() => toast.error('Failed to delete movie'));
  };

  const openDetails = async id => {
    setDetailLoading(true);
    try {
      const movie = await dispatch(fetchMovieById(id)).unwrap();
      setDetailMovie(movie);
    } catch {
      toast.error('Failed to load details');
    }
    setDetailLoading(false);
  };

  return (
    <div>
      <MovieSearchForm
        order={order}
        setOrder={setOrder}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <MoviesTable
        movies={movies}
        onDelete={handleDelete}
        onOpenDetails={openDetails}
        isLoading={isLoading}
        detailLoading={detailLoading}
      />

      {detailMovie && (
        <MovieDetailModal
          movie={detailMovie}
          onClose={() => setDetailMovie(null)}
        />
      )}
    </div>
  );
};

export default MoviesList;