import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../utils/axios';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/blog', {
                title,
                content,
                published: true,
            });
            toast.success('Post created successfully');
            navigate(`/posts/${response.data.post.id}`);
        } catch (err) {
            console.error("Post creation failed:", err.response?.data || err.message);
            toast.error(err.response?.data?.error || err.message);
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-4 py-8">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-5xl flex flex-col gap-8"
            >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Your blog title..."
                    className="w-full text-3xl font-bold bg-transparent focus:outline-none placeholder-gray-500 text-white"
                    required
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your thoughts here..."
                    className="w-full h-[60vh] bg-transparent resize-none text-lg focus:outline-none placeholder-gray-500 leading-relaxed text-white"
                    required
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
