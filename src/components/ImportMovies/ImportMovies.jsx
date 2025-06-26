import { useDispatch } from 'react-redux';
import { addMovie } from '../../redux/movies/slice';
import toast from 'react-hot-toast';

const ImportMovies = () => {
  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const movies = parseMovies(text);

    movies.forEach((movie) => {
      dispatch(addMovie({
        ...movie,
        id: Date.now() + Math.random(),
      }));
    });

    toast.success(`Imported ${movies.length} movies`);
  };

  const parseMovies = (text) => {
    const movieBlocks = text.split(/\n\s*\n/);
    const movies = [];

    for (const block of movieBlocks) {
      const lines = block.split('\n');
      const movie = {};

      for (const line of lines) {
        const [key, value] = line.split(':').map((s) => s.trim());

        if (key === 'Title') movie.title = value;
        if (key === 'Release Year') movie.year = Number(value);
        if (key === 'Format') movie.format = value;
        if (key === 'Stars') movie.actors = value.split(',').map((a) => a.trim());
      }

      if (movie.title && movie.year && movie.format && movie.actors) {
        movies.push(movie);
      }
    }

    return movies;
  };

  return (
    <div>
      <h3>Import Movies from .txt</h3>
      <input type="file" accept=".txt" onChange={handleFileChange} />
    </div>
  );
};

export default ImportMovies;