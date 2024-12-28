import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import RegisterLottie from '../../../assets/Lottie/register.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../../Shared/SocialLogin/SocialLogin';
import UseAuth from '../../../Hooks/UseAuth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = props => {
    const { createNewUser, setUser, updateUserProfile } = UseAuth();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        setError('');

        if (password.length < 6) {
            setError({ ...error, password: "Password length must be at least 6 character" })
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError({ ...error, password: "Password must have Lowercase letter" })
            return;

        }
        if (!/[A-Z]/.test(password)) {
            setError({ ...error, password: "Password must have Uppercase letter" })
            return;
        }

        // create user
        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        navigate(location?.state ? location.state : '/')
                        toast.success('Register successfully  done!')
                    })
                    .catch(error => {
                        toast.error('Something was wrong make sure your info in right or not')
                    })
            })
            .catch((error) => {
                toast.error('Something was wrong make sure your info in right or not')
            });

    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left md:w-[500px]">
                    <Lottie animationData={RegisterLottie}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
                    <SocialLogin></SocialLogin>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Enter Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoULR</span>
                            </label>
                            <input type="url" name='photo' placeholder="Enter Your Photo URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                placeholder="password"
                                className="input input-bordered"
                                required />

                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn btn-xs absolute right-4 top-12">
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </button>
                        </div>
                        {
                            error.password &&
                            <label className="label text-red-600 text-xs">
                                {error.password}
                            </label>
                        }
                        <div className="form-control mt-6">
                            <button className="btn  bg-[#7F673A] text-white">Register</button>
                        </div>
                        <p className='text-center'>Already Have An Account ? <Link to="/signIn" className='text-red-500'>SignIn</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

Register.propTypes = {

};

export default Register;