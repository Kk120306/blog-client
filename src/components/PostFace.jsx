import { useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import useFetch from "../utils/useFetch";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Comments from "./Comments";
import { useContext } from "react";
import { Typewriter } from 'react-simple-typewriter';

const PostFace = () => {
    const { id } = useParams();
    const postId = id;
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);

    const { data, loading, error } = useFetch(`/home/blog/${postId}`);
    const post = data?.post;

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );
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
    if (error || !post)
        return (
            <div className="text-center mt-20 text-red-500 font-semibold">
                {typeof error === "string" ? error : error?.message || "Post not found."}
            </div>
        );


    console.log({ user, isAuthenticated, postAuthor: post.authorId });
    const canEdit = isAuthenticated && (user?.id === post.authorId || user?.role === 'ADMIN');

    return (
        <div>
            <h1>{post.title}</h1>
            {canEdit && (
                <div className="flex gap-4">
                    <Link
                        to={`/posts/${postId}/edit`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="text-red-600 hover:text-red-800 font-medium"
                    >
                        Delete
                    </button>
                </div>
            )}

            <p className="text-lg text-gray-600">
                <i>
                    – By{" "}
                    <span className="font-semibold">
                        {post.author?.name || "Unknown"}
                    </span>
                </i>
            </p>

            <p className="text-sm text-gray-500 mb-8">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                })}
            </p>
            <article className="prose whitespace-pre-line prose-lg text-lg max-w-none text-gray-800">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {post.content}
                </ReactMarkdown>
            </article>

            <Comments user={user} post={post} />
        </div>
    );
}

export default PostFace;