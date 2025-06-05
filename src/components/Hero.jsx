import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <header>
            {isAuthenticated && user ? (
                <h1>Welcome back {user.name}</h1>
            ) : (
                <h1>Blog Insights.</h1>
            )}
            {isAuthenticated && (
                <Link to="/create">
                    <button>Create Post</button>
                </Link>
            )}
        </header>
    );
}

export default Hero;