import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post('/user/signin', {
                email,
                password
            });
            await login();
            toast.success('Logged in successfully');
            navigate("/");
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            toast.error(err.response?.data?.error || err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
            <div className="bg-[#1e1e1e] w-full max-w-md p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Sign In</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-400 hover:bg-orange-500 text-black font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-center text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-orange-400 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;
