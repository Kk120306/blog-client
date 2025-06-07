import Hero from './Hero';
import useFetch from '../utils/useFetch';
import { Typewriter } from 'react-simple-typewriter';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const { data, loading, error } = useFetch('/home/blog?limit=3');

    return (
        <div>
            <Hero />
            <div>
                <h2 className="text-3xl font-bold text-center mt-8">Latest Posts</h2>
                <p className="text-center mt-4">Discover the latest insights and trends in our blog.</p>

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
            <Link to="/posts">
                <button>All Posts</button>
            </Link>
        </div>
    );
}

export default Home;