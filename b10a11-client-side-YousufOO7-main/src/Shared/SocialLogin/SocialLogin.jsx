import React from 'react';
import PropTypes from 'prop-types';
import { FcGoogle } from 'react-icons/fc';
import UseAuth from '../../Hooks/UseAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = props => {
    const {signInWithGoogle} = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogIn = () => {
        signInWithGoogle()
        .then(result => {
            const user = result.user
            navigate(location?.state ? location?.state : '/')
            toast.success("SignIn Successful!!")
        })
        .catch(error => {
            toast.error("Something was wrong give valid info!!")
        })
    }

    return (
        <div>
            <button onClick={handleGoogleLogIn}  className='btn w-5/6 flex mx-auto mt-3'> <FcGoogle className='text-2xl'></FcGoogle> Google</button>
            <div className="divider">OR</div>
        </div>
    );
};

SocialLogin.propTypes = {

};

export default SocialLogin;