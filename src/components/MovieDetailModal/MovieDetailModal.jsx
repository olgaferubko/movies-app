import s from './MovieDetailModal.module.css';
import { RiCloseLargeLine } from "react-icons/ri";

const MovieDetailModal = ({ movie, onClose }) => {
  if (!movie) return null;
  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}><RiCloseLargeLine /></button>
        <h2 className={s.heading}>Details</h2>
        <ul className={s.detailsList}>
          <li className={s.detailsItem}>ID: {movie.id}</li>
          <li className={s.detailsItem}>Name: {movie.title}</li>
          <li className={s.detailsItem}>Year: {movie.year}</li>
          <li className={s.detailsItem}>Format: {movie.format}</li>
        </ul>
        <div>
          Actors:
          <ul className={s.actorList}>
            {movie.actors.map(actor => (
              <li key={actor.id} className={s.actorItem}>
                {actor.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;