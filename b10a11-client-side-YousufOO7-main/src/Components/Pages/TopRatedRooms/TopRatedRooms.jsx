import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AxiosSecure from '../../../Hooks/AxiosSecure';
import TopRoomsCard from '../TopRoomsCard/TopRoomsCard';

const TopRatedRooms = props => {
    const [rooms, setRooms] = useState([]);
    const axiosSecure = AxiosSecure();

    useEffect(() => {
        axiosSecure.get('/rooms')
            .then(res => setRooms(res.data))

    }, [])

    const calculateAverageRating = (reviews) => {
        return reviews?.length
            ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
            : 0;
    };

    const topRatedRooms = rooms
        .map((room) => ({
            ...room,
            averageRating: calculateAverageRating(room.reviews),
        }))
        .sort((a, b) => b.averageRating - a.averageRating) 
        .slice(0, 6); 

    return (
        <div>
            <h1 className="text-2xl md:text-4xl  text-center font-bold my-5">
                Showing Luxury Rooms</h1>
            <p className="text-center font-thin w-4/6 mx-auto">Stay in a cheerful, harmonious environment with elegant spaces. Enjoy modern amenities that inspire relaxation and seamless living.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 max-w-6xl mx-auto px-5">
                {topRatedRooms.map((room, idx) => (
                    <TopRoomsCard key={idx} room={room}></TopRoomsCard>
                ))}
            </div>

        </div>
    );
};

TopRatedRooms.propTypes = {

};

export default TopRatedRooms;