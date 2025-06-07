import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';

const PostEditor = () => {
    const { id } = useParams();
    const { isAuthenticated, user } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/home/blog/${id}`);
                setTitle(response.data.post.title);
                setContent(response.data.post.content);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };
        if (isAuthenticated) fetchPost();
        else setError("You must be logged in to edit posts.");
    }, [id, isAuthenticated, user]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.patch(`/blog/${id}`, {
                title,
                content,
                published: true,

            });
            toast.success('Post created successfully');
            navigate(`/posts/${id}`);
        } catch (err) {
            console.error("Post creation failed:", err.response?.data || err.message);
            toast.error(err.response?.data?.error || err.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (loading)
        return (
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
        );

    if (error)
        return (
            <div className="text-center mt-20 text-red-500 font-semibold">
                {typeof error === "string" ? error : error?.message || "Post not found."}
            </div>
        );

        return (
            <div className="">
                <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">
                    Edit Your Post
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="min-h-screen flex flex-col gap-4"
                >
                    <input
                        className="w-full text-2xl font-bold text-wrap bg-transparent focus:outline-none placeholder-gray-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        required
                    />
                    <textarea
                        className="w-full flex-1 bg-transparent resize-none focus:outline-none placeholder-gray-500 leading-relaxed whitespace-pre-wrap"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your markdown content here..."
                        required
                    />
                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(`/posts/${id}`)}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
}

export default PostEditor;