import { Link } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import { Typewriter } from 'react-simple-typewriter';

const Posts = () => {
    const { data, loading, error } = useFetch('/home/blog');

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mt-8">All Posts</h2>
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
                        <Link to={`/posts/${post.id}`} key={index}>
                            <div key={index} className="border p-4 rounded-lg">
                                <h3 className="text-xl font-semibold">{post.title}</h3>
                                
                            </div>
                        </Link>
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