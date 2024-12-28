import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AxiosSecure from '../../Hooks/AxiosSecure';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Aos from 'aos';

const Rooms = (props) => {
    const [rooms, setRooms] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const axiosSecure = AxiosSecure();

    // Fetch rooms with sorting
    const fetchRooms = (sortBy = "") => {
        axiosSecure
            .get(`/rooms?sortBy=${sortBy}`)
            .then((res) => setRooms(res.data));
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    Aos.init({
        duration: 1000,
        once: true,
    });

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSortOption(selectedSort);
        fetchRooms(selectedSort);
    };

    return (
        <div>
            <h1 className="text-4xl text-center font-bold my-5">All Rooms</h1>

            {/* Sort Dropdown */}
            <div className="flex justify-end max-w-6xl mx-auto px-5 mb-5">
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="select select-bordered w-52"
                >
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                </select>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 max-w-6xl mx-auto px-5">
                {rooms.map((room, idx) => {
                    // Calculate average rating
                    const averageRating = room.reviews?.length
                        ? (room.reviews.reduce((acc, review) => acc + review.rating, 0) / room.reviews.length).toFixed(1)
                        : 0;
                    const reviewCount = room.reviews?.length || 0;

                    return (
                        <Link key={idx} to={`/room/${room._id}`}>
                            <div
                                data-aos="fade-up"
                                className="card card-compact bg-base-100 shadow-xl">
                                <figure>
                                    <img
                                        className="w-full bg-cover h-[200px] transition-transform duration-700 ease-in-out hover:scale-110"
                                        src={room.image}
                                        alt={room.title}
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl">{room.title}</h2>
                                    <p>
                                        <b>Price:</b> {room.price}
                                    </p>

                                    {/* Review and Rating */}
                                    <div className="mt-1">
                                        <div className="flex items-center gap-1">
                                            <p><b>Rating:</b></p>
                                            {/* Display stars for rating */}
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    className={`${star <= averageRating ? 'text-yellow-500' : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                            {/* Display the average rating and review count */}
                                            <span className="ml-2 text-gray-700">{averageRating} / 5</span>
                                        </div>

                                        {/* Display review count */}
                                        <p className=""><b>Reviews:</b> {reviewCount} {reviewCount !== 1 ? '' : ""}
                                        </p>
                                    </div>
                                    {/* <p><b>Rome State:</b> {room.room_state}</p> */}

                                    <div className='flex gap-36'>
                                        <b>Room Status:</b>{" "}
                                        <div className={`badge ${room.room_state === "Available" ? "bg-green-500" : "bg-red-500"
                                            }`}>{room.room_state}</div>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {/*  className={`badge ${room.room_state === "Available" ? "text-green-500" : "text-red-500"
                                                }`} */}
        </div>
    );
};

Rooms.propTypes = {};

export default Rooms;
