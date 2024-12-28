import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Banner from '../Banner/Banner';
import LocationOfHotel from '../LocationOfHotel/LocationOfHotel';
import StayMemorable from '../StayMemorable/StayMemorable';
import Services from '../Services/Services';
import TopRatedRooms from '../TopRatedRooms/TopRatedRooms';
import Promotion from '../Promotion/Promotion';
import ShowUserReviews from '../ShowUserReviews/ShowUserReviews';
import './ScrollBar.css'

const Home = (props) => {
  const [showModal, setShowModal] = useState(false);

  // Promotion data
  const promotion = {
    title: "70% Off on Premium Suites - Book Today!",
    description: "Experience luxury like never before with 70% off on our premium suites. The perfect getaway for a relaxing holiday.",
    imageUrl: "https://pix10.agoda.net/hotelImages/10312316/-1/1152b227b0206d946f0cecf8ed9c0f3d.jpg?ce=0&s=414x232&ar=16x9",
  };

  // Check session storage to determine if the modal should be shown
  useEffect(() => {
    if (!sessionStorage.getItem("promotionModalShown")) {
      setShowModal(true);
      sessionStorage.setItem("promotionModalShown", "true");
    }
  }, []);

  return (
    <div>

      <div className='scroll-container '>
        <header>
          <Banner ></Banner>
        </header>
        <Promotion></Promotion>
        <main>
          <LocationOfHotel ></LocationOfHotel>
          <section>
            <TopRatedRooms ></TopRatedRooms>

            <ShowUserReviews></ShowUserReviews>

          </section>
          <StayMemorable ></StayMemorable>
          <Services ></Services>
        </main>
      </div>

      {/* DaisyUI Modal */}
      {showModal && (
        <dialog id="promotion-modal" className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <img
              src={promotion.imageUrl}
              alt={promotion.title}
              className="w-full h-[200px] object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">{promotion.title}</h3>
            <p className="py-4">{promotion.description}</p>
            <div className="modal-action">
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

Home.propTypes = {};

export default Home;
