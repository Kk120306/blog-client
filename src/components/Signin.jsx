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
            console.error(
                "Login failed:",
                err.response?.data || err.message
            );
            toast.error(err.response?.data?.error || err.message);
        }
    }



    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <p className="text-sm text-center text-gray-500">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}

export default Signin;