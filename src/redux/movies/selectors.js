export const selectAllMovies    = state => state.movies.items;
export const selectMoviesLoading = state => state.movies.isLoading;
export const selectMoviesError   = state => state.movies.error;