import AddMovieForm from './AddMovieForm/AddMovieForm';
import MoviesList from './MoviesList/MoviesList';
import SearchBar from './SearchBar/SearchBar';
import ImportMovies from './ImportMovies/ImportMovies';

function App() {
  return (
    <div>
      <h1>Collection</h1>
      <MoviesList />
      <AddMovieForm />
      <SearchBar />
      <ImportMovies />
    </div>
  );
}

export default App;
