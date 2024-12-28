import PropTypes from 'prop-types';
import { useState } from 'react';
import UseAuth from '../../Hooks/UseAuth';
import AxiosSecure from '../../Hooks/AxiosSecure';
import { toast } from 'react-toastify';

const ReviewModal = ({ selectedRoom }) => {
    const { user } = UseAuth();
    const axiosSecure = AxiosSecure();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const review = {
            userName: user?.displayName,
            userPhoto: user?.photoURL,
            userEmail: user?.email,
            roomId: selectedRoom?._id,
            roomTitle: selectedRoom?.title,
            rating,
            comment,
            timestamp: new Date().toISOString(),
        };

        try {
            // Post review data to the server
            const response = await axiosSecure.post(`/rooms/reviews`, review);
            if (response.data.success) {
                toast.success('Review submitted successfully');
                document.getElementById('my_modal_5').close();
            } else {
                toast.error('Failed to submit review');
            }
        } catch (error) {
            toast.error('Failed to submit review');
        }

    };

    const handleCloseModal = () => {
        document.getElementById('my_modal_5').close();
    };

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleSubmit} className="modal-box">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                readOnly
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Rating (1-5)</span>
                            </label>
                            <select
                                name="rating"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="select select-bordered"
                                required
                            >
                                <option value="" disabled>
                                    Select Rating
                                </option>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Review</span>
                            </label>
                            <textarea
                                name="review"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="textarea textarea-bordered"
                                placeholder="Enter your review"
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn bg-[#7F673A] text-white">
                            Submit Review
                        </button>
                        <button type="button" onClick={handleCloseModal} className="btn">
                            Close
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

ReviewModal.propTypes = {
    selectedRoom: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
    }).isRequired,
};

export default ReviewModal;
