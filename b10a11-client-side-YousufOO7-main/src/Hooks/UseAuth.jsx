import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const UseAuth = props => {
    const context = useContext(AuthContext);
    return context;
};

UseAuth.propTypes = {
    
};

export default UseAuth;