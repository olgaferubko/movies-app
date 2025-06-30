import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/slice';
import { persistor } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdOutlineLogout } from "react-icons/md";
import s from './LogoutBtn.module.css';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
    localStorage.removeItem('jwt');
    toast.success('See you soon!)');
    navigate('/login', { replace: true });
  };

  return (
    <button className={s.logoutBtn} onClick={handleLogout}>
      Log out <MdOutlineLogout />
    </button>
  );
};

export default LogoutBtn;
