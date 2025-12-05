import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        // Password validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        } else if (!/(?=.*[A-Z])/.test(password)) {
            setError('Password must contain at least one uppercase letter.');
            return;
        } else if (!/(?=.*[a-z])/.test(password)) {
            setError('Password must contain at least one lowercase letter.');
            return;
        }

        createUser(email, password)
            .then(result => {
                // In a real app, you would also update the user's profile with the name and photo URL here.
                console.log(result.user);
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Join our community and start sharing food today.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className="px-8 pb-4">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
