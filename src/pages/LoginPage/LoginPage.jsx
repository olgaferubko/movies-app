import LoginForm from '../../components/LoginForm/LoginForm';
import s from './LoginPage.module.css'

const LoginPage = () => (
  <div className={s.loginPage}>
    <h2 className={s.heading}>Welcome back to MovieShelf!</h2>
    <p className={s.loginText}>Log in to your account and continue your journey with us.</p>
    <LoginForm />
  </div>
);

export default LoginPage;
