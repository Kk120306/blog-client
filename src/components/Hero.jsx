import { AuthContext } from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import HomeBg from '../assets/home-bg.jpg';

const Hero = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [showName, setShowName] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            const timer = setTimeout(() => setShowName(true), 1700); 
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, user]);

    return (
        <header
            className="relative bg-cover bg-center h-[50vh] flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${HomeBg})` }}
        >
            <div className="absolute inset-0 bg-black/80 z-0" />

            <div className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center gap-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold drop-shadow-md leading-snug">
                    {isAuthenticated && user ? (
                        <>
                            <Typewriter
                                words={["Welcome back,"]}
                                loop={1}

                                typeSpeed={100}
                            />
                            {showName && (
                                <span className="ml-2  bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                                    <br />
                                    {user.name}
                                </span>
                            )}
                        </>
                    ) : (
                        <Typewriter
                            words={["Blog Insights."]}
                            loop={1}
                            cursor
                            cursorStyle="|"
                            typeSpeed={100}
                        />
                    )}
                </h1>

                {isAuthenticated && (
                    <Link to="/create">
                        <button className="mt-2 px-6 py-3 bg-white text-black text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition duration-300">
                            Create New Post
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Hero;
