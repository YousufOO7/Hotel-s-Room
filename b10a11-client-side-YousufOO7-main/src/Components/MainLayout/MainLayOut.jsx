import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';

const MainLayOut = props => {
    return (
        <div>
            <Navbar></Navbar>
            <div className=' min-h-[calc(100vh-315px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

MainLayOut.propTypes = {

};

export default MainLayOut;