import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMovieById, deleteMovie } from '../../redux/movies/operations';
import {
  selectAllMovies,
  selectMoviesLoading,
  selectMoviesError,
} from '../../redux/movies/selectors';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import toast from 'react-hot-toast';

import MovieSearchForm from '../../components/MovieSearchForm/MovieSearchForm';
import MoviesTable from '../../components/MoviesTable/MoviesTable';
import MovieDetailModal from '../../components/MovieDetailModal/MovieDetailModal';

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const isLoading = useSelector(selectMoviesLoading);
  const error = useSelector(selectMoviesError);

  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('');  
  const [detailMovie, setDetailMovie] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const buildParams = useCallback(
    off => {
      const params = { limit, offset: off };
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (order) {
        params.sort  = 'title';
        params.order = order;
      }
      return params;
    },
    [searchTerm, order]
  );

  useEffect(() => {
    setOffset(0);
    dispatch(fetchMovies(buildParams(0)))
      .unwrap()
      .then(resp => {
        setTotal(resp.total);
      })
      .catch(() => {});
  }, [dispatch, buildParams]);

    useEffect(() => {
      if (!error) return;
      if (error === 'API error') {
        return;
      }
        toast.error(error);
    }, [error]);

    const handleSearch = term => {
    const t = term.trim();
    if (t === '') {
      setSearchTerm('');
    } else if (t.length < 2) {
      toast.error('Please enter at least 2 characters to search');
    } else {
      setSearchTerm(t);
    }
  };

  const handleDelete = id => {
    dispatch(deleteMovie(id))
      .unwrap()
      .then(() => {
        toast.success('Movie deleted');
        setOffset(0);
        return dispatch(fetchMovies(buildParams(0))).unwrap();
      })
      .then(resp => {
        setTotal(resp.total);
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

  const handleLoadMore = () => {
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    dispatch(fetchMovies(buildParams(nextOffset)))
      .unwrap()
      .then(resp => {
        setTotal(resp.total);
      })
      .catch(() => {});
  };

  const hasMore = total === null
    ? movies.length === limit
    : movies.length < total;

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

      <LoadMoreButton
        onClick={handleLoadMore}
        disabled={isLoading}
        hasMore={hasMore}
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