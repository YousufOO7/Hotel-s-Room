import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'https://hotel-server-side-kappa.vercel.app',
    withCredentials: true
})

const AxiosSecure = () => {
    const {Logout} = UseAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('caught the error', error);

            if(error.status === 401 || error.status === 403){
                // console.log('need the logout the user')
               Logout()
               .then(() => {
                // console.log('User logout')
                navigate('/signIn')
               })
            }

            return Promise.reject(error)
        })
    }, [])

    return axiosInstance;
};

AxiosSecure.propTypes = {
    
};

export default AxiosSecure;