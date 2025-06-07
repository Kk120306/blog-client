import Hero from './Hero';
import useFetch from '../utils/useFetch';
import { Typewriter } from 'react-simple-typewriter';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const { data, loading, error } = useFetch('/home/blog?limit=3');

    return (
        <div className="bg-[#121212] text-white min-h-screen">
            <Hero />

            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-extrabold text-center mb-4 tracking-tight">Latest Posts</h2>
                <p className="text-center text-gray-400 mb-12">
                    Discover the latest insights and trends in our blog.
                </p>

                {loading && (
                    <p className="font-semibold font-mono text-center mt-20 text-lg">
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
                            }`}
                    >
                        {data.posts.map((post, index) => (
                            <PostCard post={post} key={index} index={index} />
                        ))}
                    </div>
                ) : (
                    !loading && <p className="text-center text-gray-500 mt-8">No posts available.</p>
                )}

                <div className="flex justify-center mt-12">
                    <Link to="/posts">
                        <button className="mt-2 px-6 py-3 bg-white text-black text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition duration-300">
                            View All Posts
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
