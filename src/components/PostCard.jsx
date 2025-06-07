import { Link } from "react-router-dom";
import Card1 from '../assets/card-1.jpg';
import Card2 from '../assets/card-2.jpg';
import Card3 from '../assets/card-3.jpg';

const PostCard = ({ post, index }) => {
    const images = [Card1, Card2, Card3];
    const image = images[index % images.length];

    const truncateToWords = (text, maxWords) => {
        const words = text.split(/\s+/);
        return words.length > maxWords
            ? words.slice(0, maxWords).join(" ") + "..."
            : text;
    };

    return (
        <Link
            to={`/posts/${post.id}`}
            aria-label={`Read post: ${post.title}`}
            className="group bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
            <img
                src={image}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                </h3>

                <p className="text-gray-400 text-sm flex-1 mb-4">
                    {truncateToWords(post.content, 50)}
                </p>

                <time className="text-xs text-gray-500 mt-auto">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                    })}
                </time>
            </div>
        </Link>
    );
};

export default PostCard;
