import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Banner = props => {
    return (
        <div className='px-5 py-5'>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <div
                        className="hero h-[500px]"
                        style={{
                            backgroundImage: "url(https://t3.ftcdn.net/jpg/06/39/88/70/360_F_639887058_HCisflmW1CTF4EoNBv2CADRdf0RftNoR.jpg)",
                        }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div className="max-w-3xl">
                                <h1 className="mb-3  md:text-xl"> Experience a romantic getaway in our cozy, elegantly designed room featuring a plush queen-sized bed, modern en-suite bathroom, soft ambient lighting, and a comfortable seating area. Enjoy free Wi-Fi, a flat-screen TV, and a mini-fridge, perfect for unwinding together. Large windows offer stunning views, creating the ideal setting for a memorable stay.</h1>
                                <Link to='/rooms'>
                                    <button className='btn bg-[#7F673A] text-white'>
                                        Explore More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-xs btn-circle ">❮</a>
                        <a href="#slide2" className="btn btn-circle btn-xs">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <div
                        className="hero h-[500px]"
                        style={{
                            backgroundImage: "url(https://i.kinja-img.com/image/upload/c_fit,q_60,w_645/082ef96f399227b7f81e0209ff055bc6.jpg)",
                        }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div className="max-w-3xl">
                                <h1 className="mb-3  md:text-xl"> Our spacious family-friendly room offers a queen-sized bed and additional sleeping options, a modern en-suite bathroom, and a cozy seating area. Equipped with free Wi-Fi, a flat-screen TV, and a mini-fridge, it ensures convenience and entertainment for all. With ample space and thoughtful amenities, it's perfect for creating cherished family moments.</h1>
                                <Link to='/rooms'>
                                    <button className='btn bg-[#7F673A] text-white'>
                                        Explore More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle btn-xs">❮</a>
                        <a href="#slide3" className="btn btn-circle btn-xs">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <div
                        className="hero h-[500px]"
                        style={{
                            backgroundImage: "url(https://image-tc.galaxy.tf/wijpeg-7rgnfsntskc4u9fsygs551gz/hero-presidential-suite_wide.jpg?crop=89%2C0%2C1422%2C800&width=800",
                        }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div className="max-w-3xl">
                                <h1 className="mb-3  md:text-xl"> Experience a romantic getaway in our cozy, elegantly designed room featuring a plush queen-sized bed, modern en-suite bathroom, soft ambient lighting, and a comfortable seating area. Enjoy free Wi-Fi, a flat-screen TV, and a mini-fridge, perfect for unwinding together. Large windows offer stunning views, creating the ideal setting for a memorable stay.</h1>
                                <Link to='/rooms'>
                                    <button className='btn bg-[#7F673A] text-white'>
                                        Explore More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle btn-xs">❮</a>
                        <a href="#slide1" className="btn btn-circle btn-xs">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

Banner.propTypes = {

};

export default Banner;