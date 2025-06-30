import RegisterForm from '../../components/RegisterForm/RegisterForm';
import s from './RegisterPage.module.css'

const RegisterPage = () => (
  <div className={s.registerPage}>
    <h2 className={s.heading}>Welcome back to MovieShelf!</h2>
    <p className={s.registerText}>Please register to continue using our app!</p>
    <RegisterForm />
  </div>
);

export default RegisterPage;