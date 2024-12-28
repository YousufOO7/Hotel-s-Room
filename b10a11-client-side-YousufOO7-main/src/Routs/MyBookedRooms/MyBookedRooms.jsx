import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';
import UpdateDate from '../UpdateDate/UpdateDate';
import UseAuth from '../../Hooks/UseAuth';
import AxiosSecure from '../../Hooks/AxiosSecure';
import ReviewModal from '../ReviewModal/ReviewModal';
import { GoCodeReview } from 'react-icons/go';

const MyBookedRooms = () => {
    const { user } = UseAuth();
    const axiosSecure = AxiosSecure();
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        setLoading(true); 
        try {
            const res = await axiosSecure.get(`/booked-room?email=${user?.email}`, {withCredentials: true});
            setRooms(res.data);
        } catch (error) {
            // console.error('Failed to fetch rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [user?.email]);

    // delete room
    const handleDelete = async (room) => {
        const bookingDate = new Date(room.bookingDate);
        const cancellationDeadline = new Date(bookingDate);
        cancellationDeadline.setDate(bookingDate.getDate() - 1);

        const today = new Date();
        if (today > cancellationDeadline) {
            Swal.fire({
                title: "Cancellation Not Allowed",
                text: `You can cancel your booking only up to ${format(
                    cancellationDeadline,
                    'P'
                )}.`,
                icon: "error",
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/room/${room._id}`);
                    setRooms((prevRooms) => prevRooms.filter((r) => r._id !== room._id));
                    Swal.fire({
                        title: "Cancelled!",
                        text: "Your booking has been cancelled.",
                        icon: "success",
                    });
                } catch (error) {
                    // console.error("Failed to cancel booking:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to cancel the booking. Please try again later.",
                        icon: "error",
                    });
                }
            }
        });
    };


    const handleUpdateDateModal = (room) => {
        setSelectedRoom(room);
        document.getElementById('my_modal_1').showModal();
    };

    const handleReviewModal = (room) => {
        setSelectedRoom(room);
        document.getElementById('my_modal_5').showModal();
    }

    return (
        <div>
            <section className="container px-4 mx-auto pt-12">
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800">My Booking Rooms</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
                                {rooms?.length}
                            </span>
                        </div>

                        <div className="flex flex-col mt-6">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                                                        No
                                                    </th>
                                                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                                                        Title
                                                    </th>
                                                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                                                        Image
                                                    </th>
                                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                        Deadline
                                                    </th>
                                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                        Price Range
                                                    </th>
                                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                        Description
                                                    </th>
                                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                        Actions
                                                    </th>
                                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                                                        Review
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {rooms.map((room, idx) => (
                                                    <tr key={room._id}>
                                                        <td className="px-4 py-4 text-sm text-gray-500">
                                                            {idx + 1}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500">
                                                            {room.title}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500">
                                                            <img src={room.image} className='w-16 h-16 rounded-2xl' alt={room.title} />
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500">
                                                            {format(new Date(room.bookingDate), 'P')}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500">
                                                            {room.price}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500">
                                                            {room.description.slice(0, 40)}...
                                                        </td>
                                                        <td className="px-4 py-4 text-sm">
                                                            <div className="flex items-center gap-x-6">
                                                                <button
                                                                    onClick={() => handleDelete(room)}
                                                                    className="text-gray-500 hover:text-red-500"
                                                                >
                                                                    <div className="flex gap-1">
                                                                        <b>Cancel</b>
                                                                        <MdDeleteForever className="text-2xl" />
                                                                    </div>
                                                                </button>

                                                                <button
                                                                    onClick={() => handleUpdateDateModal(room)}
                                                                    className="text-gray-500 hover:text-yellow-500"
                                                                >
                                                                    <div className="flex gap-1">
                                                                        <b>Update Date</b>
                                                                        <MdEdit className="text-2xl" />
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => handleReviewModal(room)}
                                                                className="flex items-center text-gray-500 hover:text-green-500 gap-2"
                                                            >Review <span><GoCodeReview></GoCodeReview></span></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>

            {/* Pass selected room to UpdateDate modal */}
            <UpdateDate selectedRoom={selectedRoom} onBookingUpdate={fetchRooms}></UpdateDate>

            <ReviewModal selectedRoom={selectedRoom}></ReviewModal>
        </div>
    );
};

MyBookedRooms.propTypes = {};

export default MyBookedRooms;
