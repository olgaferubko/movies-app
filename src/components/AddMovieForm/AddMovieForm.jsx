import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../redux/movies/slice';
import toast from 'react-hot-toast';
import { movieSchema } from '../validation/AddMovieForm.js'; 

const AddMovieForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [format, setFormat] = useState('DVD');
  const [actors, setActors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = { title, year, format, actors };

    try {
      await movieSchema.validate(movieData, { abortEarly: false });

      const newMovie = {
        id: Date.now(),
        title: title.trim(),
        year: parseInt(year),
        format,
        actors: actors.split(',').map((actor) => actor.trim()),
      };

      dispatch(addMovie(newMovie));
      toast.success('Movie successfully added!');

      setTitle('');
      setYear('');
      setFormat('DVD');
      setActors('');
    } catch (err) {
      if (err.inner) {
        err.inner.forEach((e) => toast.error(e.message));
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new movie</h3>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div>
        <label>Format:</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="VHS">VHS</option>
          <option value="DVD">DVD</option>
          <option value="Blu-ray">Blu-ray</option>
        </select>
      </div>
      <div>
        <label>Actors:</label>
        <input value={actors} onChange={(e) => setActors(e.target.value)} />
      </div>
      <button type="submit">Add movie</button>
    </form>
  );
};

export default AddMovieForm;
