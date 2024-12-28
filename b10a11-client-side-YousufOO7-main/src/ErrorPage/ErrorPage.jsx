import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ErrorPage = props => {
    return (
        <div
            className="h-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://i.giphy.com/media/3o7aD2saalBwwftBIY/giphy.webp')",
            }}
        >
            <div className="bg-black bg-opacity-50 text-white text-center p-6 rounded-md">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-lg mb-6">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link to='/'>
                    <button
                        className="btn btn-primary px-6 py-2 text-lg"
                    >
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

ErrorPage.propTypes = {

};

export default ErrorPage;