import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AxiosSecure from '../../../Hooks/AxiosSecure';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const ShowUserReviews = props => {
    const [allReviews, setAllReviews] = useState([]);
    const axiosSecure = AxiosSecure();

    const fetchAllReviews = () => {
        axiosSecure
            .get(`/reviews`)
            .then((res) => {
                // Sort reviews by timestamp in descending order
                const sortedReviews = res.data.sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                );
                setAllReviews(sortedReviews);
            });
    };

    useEffect(() => {
        fetchAllReviews();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold text-center my-3">User Reviews</h2>
            <div className="max-w-4xl mx-auto my-8">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {allReviews?.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full bg-center bg-cover h-[250px] flex flex-col justify-center items-center text-white relative rounded-lg shadow-lg"
                                style={{
                                    backgroundImage: `url(${review.userPhoto})`,
                                }}
                            >
                                {/*  user image */}
                                <div className="absolute top-4">
                                    <img
                                        src={review.userPhoto}
                                        alt={review.userName}
                                        className="w-12 h-12 rounded-full border-2 border-white"
                                    />
                                </div>

                                {/* user Review details */}
                                <div className="mt-16 text-center bg-black bg-opacity-50 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold">{review.userName}</h3>
                                    <p className="text-gray-200 italic mb-2">"{review.comment}"</p>
                                    <p className="text-yellow-400 font-bold">Rating: {review.rating} / 5</p>
                                    <p className="text-gray-300 text-sm">{new Date(review.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

ShowUserReviews.propTypes = {

};

export default ShowUserReviews;