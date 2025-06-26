import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies/slice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'movies',
  storage,
};

const persistedMoviesReducer = persistReducer(persistConfig, moviesReducer);

export const store = configureStore({
  reducer: {
    movies: persistedMoviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
