import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import navLogo from '../../../public/hotel-logo.avif'
import UseAuth from '../../Hooks/UseAuth';

const Navbar = props => {
    const { user, Logout } = UseAuth();

    const Links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/rooms">Rooms</NavLink></li>
        <li><NavLink to="/myBooking">My Bookings</NavLink></li>
    </>

    return (
        <div className="navbar bg-[#FAF5E8] px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            Links
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost">
                    <div className='flex items-center gap-2'>
                        <img src={navLogo} className='w-8 h-8 rounded-full' alt="" />
                        <p className=' md:text-xl font-bold'>Hotel Ali Baba</p>
                    </div></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        Links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user && user?.email ? <div className='flex items-center gap-2'>
                        <p className='hidden md:block '>{user?.displayName}</p>
                        <img referrerPolicy='no-referrer' className='h-[40px] rounded-full mr-2' src={user?.photoURL} alt="image" />
                    </div> : ''
                }
                {
                    user && user?.email ? <Link to="/"><button onClick={Logout} className="btn btn-error text-white">Log-Out</button></Link> : <Link to="/signIn" className="btn  bg-[#7F673A] text-white">Login</Link>

                }

            </div>
        </div>
    );
};

Navbar.propTypes = {

};

export default Navbar;