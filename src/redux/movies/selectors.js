export const selectMoviesState    = state => state.movies;
export const selectAllMovies      = state => selectMoviesState(state).items || [];
export const selectCurrentMovie   = state => selectMoviesState(state).current;
export const selectMoviesLoading  = state => selectMoviesState(state).isLoading;
export const selectMoviesError    = state => selectMoviesState(state).error;
export const selectMoviesTotal    = state => selectMoviesState(state).total;