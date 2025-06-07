import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { toast } from "sonner";
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
            toast.success('Post updated successfully');
            navigate(`/posts/${id}`);
        } catch (err) {
            console.error("Post update failed:", err.response?.data || err.message);
            toast.error(err.response?.data?.error || err.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (loading)
        return (
            <p className="font-semibold font-mono text-center mt-20 text-white">
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
        <div className="min-h-screen w-full bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-4 py-8">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-5xl flex flex-col gap-8"
            >
                <h2 className="text-3xl font-bold text-white text-center">Edit Your Post</h2>

                <input
                    className="w-full text-3xl font-bold bg-transparent focus:outline-none placeholder-gray-500 text-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title"
                    required
                />

                <textarea
                    className="w-full h-[60vh] bg-transparent resize-none focus:outline-none placeholder-gray-500 leading-relaxed text-white"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your markdown content here..."
                    required
                />

                <div className="flex justify-end gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/posts/${id}`)}
                        className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostEditor;
