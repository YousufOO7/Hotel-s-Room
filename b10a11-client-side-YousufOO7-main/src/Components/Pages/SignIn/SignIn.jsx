import React, { useState } from 'react';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import SigInLottie from '../../../assets/Lottie/signIn.json';
import SocialLogin from '../../../Shared/SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UseAuth from '../../../Hooks/UseAuth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignIn = () => {
    const { signIn, setUser } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(location?.state ? location?.state : '/')
                toast.success(`Welcome ${user?.displayName}`);
            })
            .catch((err) => {
                setError({ login: err.message });
                toast.error('Something went wrong. Please check your credentials.');
            });
    };

    return (
        <div className="hero bg-[#FAF5E8] min-h-screen mt-3">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left md:w-[500px]">
                    <Lottie animationData={SigInLottie} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="ml-8 mt-4 text-5xl font-bold">Sign In now!</h1>
                    <SocialLogin />
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn btn-xs absolute right-4 top-12"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {error.login && (
                                <label className="label text-red-500 text-xs">{error.login}</label>
                            )}
                            <label className="label">
                                <Link
                                    to="/forgotPassword"
                                    state={{ email }}
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign In</button>
                        </div>
                        <p className="text-center">
                            Don’t have an account?{' '}
                            <Link to="/register" className="text-red-500">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

SignIn.propTypes = {
    signIn: PropTypes.func,
    setUser: PropTypes.func,
};

export default SignIn;
