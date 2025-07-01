import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { importMovies } from '../../redux/movies/operations';
import toast from 'react-hot-toast';
import { CiImport } from 'react-icons/ci';
import s from './ImportMovies.module.css';

const ImportMovies = ({ onImportSuccess }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const text = await file.text();
      const cleanedFile = new File([text], file.name, { type: 'text/plain' });

      const imported = await dispatch(importMovies(cleanedFile)).unwrap();
      const count = Array.isArray(imported) ? imported.length : 0;
      toast.success(`Imported ${count} movie${count !== 1 ? 's' : ''}`);

      onImportSuccess?.();
    } catch (err) {
      toast.error(err.message || 'Import failed');
    } finally {
      setLoading(false);
      e.target.value = null;
    }
  };

  return (
    <div className={s.wrapper}>
      <input
        ref={inputRef}
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        disabled={loading}
        className={s.hidden}
      />
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        disabled={loading}
        className={s.iconBtn}
      >
        <CiImport />
      </button>
    </div>
  );
};

export default ImportMovies;