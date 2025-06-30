import s from './LoadMoreButton.module.css';
import { IoArrowDownSharp } from "react-icons/io5";

const LoadMoreButton = ({ onClick, disabled, hasMore }) => {
  if (!hasMore) return null;
  return (
    <button
      className={s.loadMoreBtn}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? 'Loading…' : 'Load more'}
      <IoArrowDownSharp className={s.iconArrow}/>
    </button>
  );
};

export default LoadMoreButton;