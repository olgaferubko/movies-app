import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineRocketLaunch } from "react-icons/md";
import { registerUser  } from '../../redux/auth/operations';
import { clearAuthError } from '../../redux/auth/slice';
import { selectAuthLoading } from '../../redux/auth/selectors';
import s from './RegisterForm.module.css'

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password is reguired, at least 6 symbols').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

  const onSubmit = values => {
    dispatch(registerUser(values))
      .unwrap()
      .then(() => {
        toast.success('Registered successfully!');
        navigate('/movies', { replace: true });
      })
      .catch(error => {
        if (error?.code === 'EMAIL_NOT_UNIQUE') {
          toast.error('Email is already in use');
+         dispatch(clearAuthError());
        } else {
          toast.error('Oops! Something went wrong');
+         dispatch(clearAuthError());
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={s.form}>
      <label className={s.field}>
        <input 
        type="text"
        placeholder='Name'
        {...register('name')}
        className={s.registerInput}
        />
      </label>
      {errors.name && <p className={s.error}>{errors.name.message}</p>}

      <label className={s.field}>
        <input
        type="email"
        placeholder='Email'
        {...register('email')}
        className={s.registerInput}
        
        />
      </label>
      {errors.email && <p className={s.error}>{errors.email.message}</p>}

      <label className={s.field}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            {...register('password')}
            className={s.registerInput}
            autoComplete="new-password"
          />
          <button 
          type="button"
          className={s.toggleBtn} 
          onClick={togglePasswordVisibility}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
      </label>
      {errors.password && <p className={s.error}>{errors.password.message}</p>}

      <label className={s.field}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm password'
            {...register('confirmPassword')}
            className={s.registerInput}
            autoComplete="new-password"
          />
          <button 
          type="button"
          className={s.toggleBtn} 
          onClick={toggleConfirmPasswordVisibility} >
            {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
      </label>
      {errors.confirmPassword && <p className={s.error}>{errors.confirmPassword.message}</p>}


        <div className={s.registerWrapper}>
        <Link to="/login" className={s.registerLink}>Already registered?</Link>
        <button type="submit" disabled={isLoading} className={s.submitBtn}>
          {isLoading ? 'Loading...' : 'Sign Up'}
          <MdOutlineRocketLaunch className={s.iconRocket} />
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;