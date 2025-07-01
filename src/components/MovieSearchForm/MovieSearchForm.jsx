import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import SortDropdown from '../SortDropdown/SortDropdown';
import AddMovieModal from '../AddMovieModal/AddMovieModal';
import ImportMovies from '../ImportMovies/ImportMovies';
import { toast } from 'react-hot-toast';
import s from './MovieSearchForm.module.css';

const MIN_SEARCH_LENGTH = 2;

const MovieSearchForm = ({
  order,
  setOrder,
  onSearch,
  isLoading,
  onImportSuccess,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const term = searchTerm.trim();

    if (term.length === 0) {
      return;
    }

    if (term.length < MIN_SEARCH_LENGTH) {
      toast.error(`Too short, enter at least ${MIN_SEARCH_LENGTH} characters`);
      return;
    }

    onSearch(term);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.leftGroup}>
          <input
            type="text"
            placeholder="Search by title or actor"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            disabled={isLoading}
            className={s.searchInput}
          />
          <button type="submit" disabled={isLoading} className={s.searchBtn}>
            Search<IoIosSearch />
          </button>
          <SortDropdown order={order} setOrder={setOrder} />
        </div>

        <div className={s.rightGroup}>
          <button
            type="button"
            className={s.addBtn}
            onClick={() => setShowAddModal(true)}
            disabled={isLoading}
          >
            <IoAddOutline className={s.iconAdd} />
          </button>

          <ImportMovies onImportSuccess={onImportSuccess} />
        </div>
      </form>

      {showAddModal && (
        <AddMovieModal
          onClose={() => setShowAddModal(false)}
          onAddSuccess={() => {
            setShowAddModal(false);
            onSearch(searchTerm.trim());
          }}
        />
      )}
    </>
  );
};

export default MovieSearchForm;