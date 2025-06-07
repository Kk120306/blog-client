import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { toast } from "sonner";
import useFetch from "../utils/useFetch";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Comments from "./Comments";
import { Typewriter } from 'react-simple-typewriter';

const PostFace = () => {
    const { id } = useParams();
    const postId = id;
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);

    const { data, loading, error } = useFetch(`/home/blog/${postId}`);
    const post = data?.post;

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            await api.delete(`blog/${postId}`);
            toast.success("Post deleted.");
            navigate("/posts");
        } catch (err) {
            console.error("Delete failed:", err.response?.data || err.message);
            toast.error("Deletion failed.");
        }
    };

    if (loading)
        return (
            <p className="text-center mt-20 text-gray-300 text-lg font-mono">
                Loading
                <Typewriter words={["..."]} loop={0} cursor cursorStyle="" typeSpeed={100} />
            </p>
        );

    if (error || !post)
        return (
            <div className="text-center mt-20 text-red-400 font-semibold">
                {typeof error === "string" ? error : error?.message || "Post not found."}
            </div>
        );

    const canEdit = isAuthenticated && (user?.id === post.authorId || user?.role === 'ADMIN');

    return (
        <div className="bg-[#121212] min-h-screen text-white py-16 px-4">
            <div className="max-w-4xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-lg p-8 space-y-6">
                <h1 className="text-4xl font-extrabold text-white leading-tight">{post.title}</h1>

                {canEdit && (
                    <div className="flex gap-6">
                        <Link
                            to={`/posts/${postId}/edit`}
                            className="text-blue-400 hover:text-blue-300 font-medium transition"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="text-red-400 hover:text-red-300 font-medium transition"
                        >
                            Delete
                        </button>
                    </div>
                )}

                <div className="text-sm text-gray-400 space-y-1">
                    <p>
                        – By{" "}
                        <span className="text-gray-200 font-semibold">
                            {post.author?.name || "Unknown"}
                        </span>
                    </p>
                    <p>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                        })}
                    </p>
                </div>

                <article className="prose prose-invert prose-pre:bg-[#1a1a1a] prose-code:text-blue-300 prose-a:text-blue-400 max-w-none text-gray-200 whitespace-pre-wrap">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {post.content}
                    </ReactMarkdown>
                </article>

                <div className="pt-6 border-t border-gray-700">
                    <Comments user={user} post={post} />
                </div>
            </div>
        </div>
    );
};

export default PostFace;
