import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';

const Services = props => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('./servicesCard.json')
            .then(res => res.json())
            .then(data => setServices(data))

        Aos.init({
            duration: 1000, 
            once: true,    
        });
    }, [])

    return (
        <div className='py-10 bg-[#FAF5E8]'>
            <h3 className="text-lg font-semibold text-center mb-2">SERVICES</h3>
            <h2 className="text-4xl font-bold text-center">Bring You The Best Experience</h2>

            <div className='max-w-5xl mx-auto my-5 space-y-2 px-5'>
                {
                    services.map((data, idx) => <div
                        data-aos="fade-up"
                        key={idx}
                        className="flex-row-reverse md:flex bg-base-100 rounded-lg shadow-xl p-5 ">
                        {/* Right Section */}
                        <div className="flex-1 ">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="rounded-lg object-cover w-full h-[250px] transition-transform duration-700 ease-in-out hover:scale-110"
                            />
                        </div>

                        {/* Left Section */}
                        <div className="flex-1">
                            <h4 className="text-sm uppercase font-semibold text-gray-500">{data.category}</h4>
                            <h2 className="text-2xl font-bold mt-2">{data.title}</h2>
                            <p className="text-gray-600 my-4">{data.description}</p>
                            <p className="font-medium text-gray-700">{data.timing}</p>
                            <button className="btn btn-outline mt-4">{data.cta}</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

Services.propTypes = {

};

export default Services;