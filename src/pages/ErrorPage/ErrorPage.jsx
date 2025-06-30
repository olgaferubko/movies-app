import s from './ErrorPage.module.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className={s.containerError}>
            <title>Error</title>
            <h2 className={s.heading}>Page not found!</h2>
            <Link to="/login" className={s.errorLink}>Please return to the login page</Link>
        </div>
    );
};

export default ErrorPage;