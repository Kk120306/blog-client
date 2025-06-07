import { LuGithub } from "react-icons/lu";

const About = () => {
    return (
        <div className="min-h-screen bg-[#121212] text-white px-4 py-20">
            <div className="max-w-3xl mx-auto text-center mt-20">
                <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
                    About Us<span className="text-orange-400">.</span>
                </h1>

                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    Welcome to our blog! We’re passionate about sharing insights and stories that inspire, educate, and spark meaningful conversations.
                </p>

                <p className="text-lg text-gray-400 leading-relaxed mb-12">
                    Our team is made up of curious minds — from seasoned writers to everyday enthusiasts — who love diving into a wide range of topics, from technology and productivity to creativity and lifestyle.
                </p>

                <div className="flex items-center justify-center gap-2 text-gray-300 text-md mt-10">
                    <span>Developed by</span>
                    <a
                        href="https://github.com/Kk120306"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition"
                    >
                        <LuGithub className="text-2xl" />
                        <span className="font-semibold">Kk120306</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
