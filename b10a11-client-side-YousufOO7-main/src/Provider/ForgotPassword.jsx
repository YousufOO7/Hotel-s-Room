import PropTypes from 'prop-types';
import {  useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import app from '../Firebase/Firebase_config';


const auth = getAuth(app);

const ForgotPassword = props => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent! Redirecting to Gmail...");
            window.location.href = "https://mail.google.com"; 
        } catch (error) {
            // console.error(error);
            toast.error("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Enter your email to receive a password reset link.
                </p>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <div className="flex items-center border rounded px-3 py-2">
                            <FaEnvelope className="mr-2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                        onClick={handleResetPassword}
                            type="button"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ForgotPassword.propTypes = {
    props: PropTypes
};

export default ForgotPassword;