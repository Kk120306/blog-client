import { MdEmail } from "react-icons/md";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-6 md:px-20 py-10">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">


                <div className="border-l-4 h-14 pl-3">
                    <h3 className="text-lg font-bold">Blog</h3>
                    <p className="text-sm mt-1">Insights<span className="font-bold text-blue-400">.</span></p>
                </div>


                <div>
                    <h2 className="text-xl font-semibold mb-2">Connect with Us</h2>
                    <ul className="text-sm space-y-1">
                        <li>123 South Mall</li>
                        <li>Vancouver, BC 999 999</li>
                        <li>Canada</li>
                        <li className="flex items-center gap-2 mt-2">
                            <MdEmail className="text-lg text-grey-400" />
                            <a href="mailto:pacificmarketinsight@gmail.com" className="hover:underline">
                                BlogInsight@email.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <AiOutlineLinkedin className="text-lg text-grey-400" />
                            <a href="https://linkedin.com" target="_blank" className="hover:underline">
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>


                <div className="text-sm text-center md:text-left">
                    <p className="mb-2">&copy; 2025 Blog Insight. All rights reserved.</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
