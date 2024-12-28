import React from 'react';
import PropTypes from 'prop-types';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRout = ({children}) => {
    const {user, loading} = UseAuth();
    const location = useLocation();

    if(loading){
        return <div className='flex min-h-screen justify-center items-center'><span><span className="loading loading-spinner loading-lg"></span></span></div>
    }

    if(user){
        return children
    }

    return (
        <Navigate state={location?.pathname} to='/signIn'></Navigate>
    );
};

PrivateRout.propTypes = {
    
};

export default PrivateRout;