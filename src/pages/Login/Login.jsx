import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { axiosSecure } from '../../hooks/useAxiosSecure';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                const loggedUser = {
                    email: user.email
                }
                // get jwt token
                axiosSecure.post('/jwt', loggedUser)
                    .then(res => {
                        console.log(res.data);
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => console.error(error));
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const loggedUser = {
                    email: user.email
                }
                // get jwt token
                axiosSecure.post('/jwt', loggedUser)
                    .then(res => {
                        console.log(res.data);
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome back! Please login to continue.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="divider px-8">OR</div>
                    <div className="px-8 pb-4">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary w-full">Login with Google</button>
                    </div>
                    <p className="px-8 pb-4">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;