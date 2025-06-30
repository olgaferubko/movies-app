import { useState, useRef, useEffect } from 'react';
import { TbArrowsSort } from 'react-icons/tb';
import s from './SortDropdown.module.css';

const SortDropdown = ({ order, setOrder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSelect = val => {
    setOrder(val);
    setOpen(false);
  };

  return (
    <div className={s.wrapper} ref={ref}>
      <button
        type="button"
        className={s.toggleBtn}
        onClick={() => setOpen(o => !o)}
      >
        <TbArrowsSort className={s.iconSort} />
      </button>
      {open && (
        <ul className={s.menu}>
          <li>
            <button
              type="button"
              className={order === 'ASC' ? s.active : ''}
              onClick={() => handleSelect('ASC')}
            >
              A → Z
            </button>
          </li>
          <li>
            <button
              type="button"
              className={order === 'DESC' ? s.active : ''}
              onClick={() => handleSelect('DESC')}
            >
              Z → A
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;