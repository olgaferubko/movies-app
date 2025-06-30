import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineRocketLaunch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { clearAuthError } from '../../redux/auth/slice';
import { loginUser } from '../../redux/auth/operations';
import { selectAuthLoading, selectAuthError } from '../../redux/auth/selectors';
import s from './LoginForm.module.css';

const schema = Yup.object().shape({
  email:    Yup.string().email('Invalid format').required('Email is required'),
  password: Yup.string()
    .min(6,   'Password is reguired, at least 6 symbols')
    .required('Password is required'),
});

const LoginForm = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      const msg = typeof authError === 'string'
        ? authError
        : authError.code || JSON.stringify(authError);
      toast.error(msg);
    }
  }, [authError]);

  const onSubmit = credentials => {
    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => {
        toast.success('Successfully logged in');
        navigate('/movies', { replace: true });
      })
      .catch(() => {
        toast.error('Invalid credentials, please try again');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={s.form}>
      <label className={s.field}>
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          autoComplete="usermail"
          className={`${s.loginInput} ${errors.email ? s.invalid : ''}`}
        />
      </label>
      {errors.email && <p className={s.error}>{errors.email.message}</p>}

      <label className={s.field}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register('password')}
          autoComplete="current-password"
          className={`${s.loginInput} ${errors.password ? s.invalid : ''}`}
        />
        <button
          type="button"
          className={s.toggleBtn}
          onClick={() => setShowPassword(v => !v)}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </label>
      {errors.password && <p className={s.error}>{errors.password.message}</p>}

      <div className={s.loginWrapper}>
        <Link to="/register" className={s.loginLink}>
          Don't have an account yet?
        </Link>
        <button type="submit" disabled={isLoading} className={s.submitBtn}>
          {isLoading ? 'Loading...' : 'Log In'}
          <MdOutlineRocketLaunch className={s.iconRocket} />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
