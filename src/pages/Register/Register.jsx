import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import PageTitle from '../../components/PageTitle';

const Register = () => {
    const { createUser, googleSignIn } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        setRegisterError('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case character.');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setRegisterError('Your password should have at least one lower case character.');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;

                // Update Profile
                updateProfile(user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {
                        // Create JWT Token
                        const userEmail = { email: user.email };
                        axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userEmail, { withCredentials: true })
                            .then(res => {
                                if (res.data.success) {
                                    toast.success('User created successfully');
                                    navigate('/');
                                }
                            })
                            .catch(err => {
                                // Even if JWT fails, user is created, so we might still want to redirect but warn
                                toast.success('User created locally');
                                navigate('/');
                            });
                    })
                    .catch(error => {
                        console.error("Profile update error:", error);
                    });
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
                toast.error(error.message);
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
            <PageTitle title="Register" />
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Create an account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join our community today
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo URL</label>
                            <input
                                id="photo"
                                name="photo"
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>
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

                    {registerError && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">
                            {registerError}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md transition-colors"
                        >
                            Sign Up
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
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
