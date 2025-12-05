import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import PageTitle from '../../components/PageTitle';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        signIn(email, password)
            .then(result => {
                const user = result.user;
                const userEmail = { email: user.email };

                // Get JWT Token
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userEmail, { withCredentials: true })
                    .then(res => {
                        if (res.data.success) {
                            toast.success('Logged in successfully');
                            navigate(location?.state ? location.state : '/');
                        } else {
                            // Fallback if success flag isn't strictly returned but call succeeded
                            toast.success('Logged in successfully');
                            navigate(location?.state ? location.state : '/');
                        }
                    })
                    .catch(() => {
                        // Even if JWT fails, user is logged in locally
                        toast.success('Logged in successfully');
                        navigate(location?.state ? location.state : '/');
                    });
            })
            .catch(error => {
                console.error(error);
                toast.error('Invalid email or password');
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const userEmail = { email: user.email };
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userEmail, { withCredentials: true })
                    .then(res => {
                        toast.success('Google Sign In Successful');
                        navigate(location?.state ? location.state : '/');
                    })
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <PageTitle title="Login" />
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to continue sharing
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="••••••••"
                            />
                            <span
                                className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-green-600 hover:text-green-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                            <FaGoogle className="text-red-500 mr-2" />
                            Sign in with Google
                        </button>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
