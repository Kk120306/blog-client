import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
            <Link
                to={`/posts/${post.id}`}
                aria-label={`Read post: ${post.title}`}
                className="flex flex-col flex-1"
            >
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                </h3>
                <p className="text-gray-700 mb-4 flex-1 line-clamp-3">
                    {post.content}
                </p>{" "}
                <time className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                    })}
                </time>
            </Link>
    );
};

export default PostCard;
