import { Link } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import { Typewriter } from 'react-simple-typewriter';
import PostCard from './PostCard';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Posts = () => {
    const { data, loading, error } = useFetch('/home/blog');
    const { isAuthenticated } = useContext(AuthContext);


    return (
        <div className="bg-[#121212] text-white px-4 py-20 min-h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mt-8">All Posts</h2>
            <p className="text-center mt-4 text-gray-400 mb-12">Discover the latest insights and trends in our blog.</p>


            {isAuthenticated && (
                    <Link to="/create">
                        <button className="mt-2 px-6 py-3 bg-white text-black text-lg font-semibold rounded-xl shadow-lg hover:bg-black hover:text-white hover:scale-90 
                        transition duration-300 mb-19">
                            Create New Post
                        </button>
                    </Link>
                )}


            {loading && (
                <p className="font-semibold font-mono text-center mt-20">
                    Loading
                    <Typewriter
                        words={["..."]}
                        loop={0}
                        cursor
                        cursorStyle=""
                        typeSpeed={100}
                    />
                </p>
            )}

            {error && (
                <p className="text-red-500 text-center mt-4">
                    Error: {error.message}
                </p>
            )}

            {data?.posts?.length > 0 ? (
                <div
                    className={`grid gap-8 ${data.posts.length === 1
                        ? 'grid-cols-1 justify-items-center max-w-xs mx-auto'
                        : data.posts.length === 2
                            ? 'grid-cols-2 justify-items-center max-w-2xl mx-auto'
                            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        }`}>
                    {data.posts.map((post, index) => (
                        <PostCard post={post} key={index} index={index} />
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-center mt-8">No posts available.</p>
                </div>
            )}
        </div>
    )
}

export default Posts;