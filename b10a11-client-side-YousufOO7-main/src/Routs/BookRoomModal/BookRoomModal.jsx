import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AxiosSecure from '../../Hooks/AxiosSecure';
import UseAuth from '../../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookRoomModal = ({ rooms }) => {
    const navigate = useNavigate();
    const { user } = UseAuth();
    const axiosSecure = AxiosSecure();
    const [startDate, setStartDate] = useState(new Date());
    const { image, description, title, price, features } = rooms;


    const handleConfirmBooking = async () => {
        try {
            const bookedRoom = {
                ...rooms,
                bookingDate: startDate,
                user: user?.email
            }
            await axiosSecure.post('/booked-room', bookedRoom);
            toast.success(`${title} has been booked successfully Done!!`)
            navigate('/myBooking')
            document.getElementById('my_modal_1').close();
        }
        catch (error) {
            toast.error(`${error}`)
        }
    }

    const handleCancelBooking = () => {
        document.getElementById('my_modal_1').close();
    }


    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div>
                        <img src={image} alt="" className='w-full h-[180px]' />
                    </div>
                    <h3 className="font-bold text-lg">Title: {title}</h3>
                    <p className="py-4"><b>Description:</b> {description.slice(0, 90)}...</p>
                    <p className=""><b>Price:</b> {price}</p>
                    <div className='my-3 flex items-center gap-4'>
                        <p><b>Pick a Date:</b></p>
                        <DatePicker
                            className='border p-2 rounded-md'
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={new Date()}
                        ></DatePicker>
                    </div>
                    <p className="font-semibold mt-3">Features:</p>
                    <div className="flex gap-2 flex-wrap">
                        {features.map((feature, idx) => (
                            <p
                                key={idx}
                                className="border rounded-md text-center px-2 hover:text-white hover:bg-blue-400"
                            >
                                {feature}
                            </p>
                        ))}
                    </div>
                    <div className=" mt-3">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                onClick={handleConfirmBooking}
                                className="btn w-full mb-2 bg-[#7F673A] text-white">Confirm Book</button>
                            <button
                                onClick={handleCancelBooking}
                                className="btn w-full  bg-[#7F673A] text-white">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

BookRoomModal.propTypes = {

};

export default BookRoomModal;