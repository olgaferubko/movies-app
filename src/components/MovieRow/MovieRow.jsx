import { AiOutlineDelete } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import s from './MovieRow.module.css'

const MovieRow = ({ movie, onDelete, onOpenDetails, isLoading, detailLoading }) => {
  return (
    <tr className={s.movieRow}>
      <td className={s.tableItem}>{movie.title}</td>
      <td className={s.tableItem}>{movie.year}</td>
      <td className={s.tableItem}>{movie.format}</td>
      <td className={s.tableBtns}>
        <button className={s.detailsBtn} disabled={detailLoading} onClick={() => onOpenDetails(movie.id)}>
          <BsInfoCircle />
        </button>
        <button className={s.deleteBtn} disabled={isLoading} onClick={() => onDelete(movie.id)}>
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  );
};

export default MovieRow;