import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import AxiosSecure from '../../Hooks/AxiosSecure';
import { toast } from 'react-toastify';

const UpdateDate = ({ selectedRoom, onBookingUpdate }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const axiosSecure = AxiosSecure();

    const handleConfirmUpdate = async id => {
        setLoading(true); 
        try {
            const updateDate = { bookingDate: startDate };
            await axiosSecure.put(`/dateUpdate/${id}`, updateDate);
            toast.success('Booking updated successfully!!');
            onBookingUpdate(); 
            document.getElementById('my_modal_1').close();
        } catch (error) {
            toast.error('Failed to update booking. Please try again.');
        } finally {
            setLoading(false); 
        }
    };

    const handleCancelUpdate = () => {
        document.getElementById('my_modal_1').close();
    };

    return (
        <div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div>
                        <img src={selectedRoom?.image} alt="Room" className="w-full h-[180px]" />
                    </div>
                    <h3 className="font-bold text-lg">Title: {selectedRoom?.title}</h3>
                    <p><b>Price:</b> {selectedRoom?.price}</p>
                    {selectedRoom?.bookingDate && (
                        <p className="my-2">
                            <b>Booking Date:</b> {format(new Date(selectedRoom?.bookingDate), 'P')}
                        </p>
                    )}
                    <div className="my-3 flex items-center gap-4">
                        <p><b>Update Date:</b></p>
                        <DatePicker
                            className="border p-2 rounded-md"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={new Date()}
                        />
                    </div>
                    <div className="modal-action">
                        <button
                            onClick={() => handleConfirmUpdate(selectedRoom?._id)}
                            className="btn w-full bg-[#7F673A] text-white"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Confirm Update'}
                        </button>
                        <button onClick={handleCancelUpdate} className="btn bg-[#7F673A] text-white">
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

UpdateDate.propTypes = {
    
};

export default UpdateDate;
