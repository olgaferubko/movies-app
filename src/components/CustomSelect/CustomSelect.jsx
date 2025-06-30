import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import s from './CustomSelect.module.css';

const options = ['DVD', 'VHS', 'Blu-Ray'];

const CustomSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleToggle = () => setIsOpen(prev => !prev);
  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={s.dropdown} ref={ref}>
      <div className={s.selectBtn}>
        <span>{value || 'Format'}</span>
        <button type="button" onClick={handleToggle} className={s.iconBtn}>
          <IoIosArrowDown className={s.icon} />
        </button>
      </div>

      {isOpen && (
        <ul className={s.dropdownMenu}>
          {options.map(option => (
            <li
              key={option}
              className={`${s.item} ${value === option ? s.selected : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
              {value === option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;