import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, fetchMovies } from '../../redux/movies/operations';
import toast from 'react-hot-toast';
import { IoAddOutline } from 'react-icons/io5';
import { RiCloseLargeLine } from 'react-icons/ri';
import { movieSchema } from '../validation/AddMovieForm';
import CustomSelect from '../CustomSelect/CustomSelect';
import s from './AddMovieModal.module.css';

const AddMovieModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [format, setFormat] = useState('');
  const [actors, setActors] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setTitle('');
    setYear('');
    setFormat('DVD');
    setActors('');
    setErrors({});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});

    const movieData = { title, year, format, actors };
    try {
      await movieSchema.validate(movieData, { abortEarly: false });
      const newMovie = {
        title: title.trim(),
        year: Number(year),
        format,
        actors: actors.split(',').map(a => a.trim()).filter(Boolean),
      };
      setLoading(true);
      await dispatch(addMovie(newMovie)).unwrap();
      await dispatch(fetchMovies({ sort: 'title', order: 'ASC', limit: 10, offset: 0 })).unwrap();
      toast.success('Movie successfully added!');
      resetForm();
      onClose();
    } catch (err) {
      if (err.inner) {
        const formErrors = err.inner.reduce((acc, { path, message }) => {
          acc[path] = message;
          return acc;
        }, {});
        setErrors(formErrors);
      } else {
        toast.error(err.message || 'Failed to add movie');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}>
          <RiCloseLargeLine className={s.iconClose} />
        </button>

        <form onSubmit={handleSubmit} className={s.form} noValidate>
          <h3 className={s.modalHeading}>Add a new movie</h3>

          <label className={s.field}>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
              placeholder="Title"
              className={s.input}
            />
          </label>
          {errors.title && <p className={s.error}>{errors.title}</p>}

          <label className={s.field}>
            <input
              type="number"
              value={year}
              onChange={e => setYear(e.target.value)}
              disabled={loading}
              placeholder="Year"
              className={`${s.input} ${s.noSpinners}`}
            />
          </label>
          {errors.year && <p className={s.error}>{errors.year}</p>}

          <div className={`${s.field} ${s.selectWrapper}`}>  
            <CustomSelect
              value={format}
              onChange={setFormat}
              disabled={loading}
            />
          </div>
          {errors.format && <p className={s.error}>{errors.format}</p>}

          <label className={s.field}>
            <input
              value={actors}
              onChange={e => setActors(e.target.value)}
              disabled={loading}
              placeholder="Actors"
              className={s.input}
            />
          </label>
          {errors.actors && <p className={s.error}>{errors.actors}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={s.submitBtn}
          >
            {loading ? 'Adding...' : 'Add'} <IoAddOutline />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;