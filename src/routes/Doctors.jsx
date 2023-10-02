/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchdoctors } from '../redux/doctors/doctorSlice';
import facebookIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';
import linkedinIcon from '../assets/linkedin.png';
import useWindowSize from '../hooks/use-window-size';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
}

const Doctors = () => {
  const dispatch = useDispatch();
  const { isMobile, isSmallDesktop } = useWindowSize();
  const allDoctors = useSelector((state) => state.doctors);
  const finalDoctorsData = allDoctors.doctors;

  useQuery('doctorsList', () => dispatch(fetchdoctors()));

  const settings = isMobile ? (
    {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }
  ) : (
    isSmallDesktop ? (
      {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    ) : (
      {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      }
    ));

  return (
    <section className="w-full h-screen flex flex-col sm:justify-center gap-10 items-center pt-12 sm:pb-24">
      <div className="flex flex-col gap-4 justify-center">
        <h2 className="text-lg md:text-xl lg:text-2xl text-center font-bold">Meet Our Physicians</h2>
        <div>
          <p className="text-xs md:text-base lg:text-lg">Choose the doctor of your preference</p>
          <p className="text-xs md:text-base lg:text-lg">to reserve an appointment</p>
        </div>

      </div>

      <div className={`${isMobile ? 'w-[200px]' : 'w-[740px]'}`}>
        <Slider {...settings}>
          {finalDoctorsData.map((item) => (
            <Link to={`/doctor/${item.id}`} key={item.id}>
              <div className="w-[148px] mx-4 my-4">
                <div className="h-[148px] object-cover rounded-full shadow-md shadow-gray-300 hover:shadow-green-300">
                  <img src={item.photo_url} alt={item.name} className="w-full h-full rounded-full" />
                </div>
                <span className="flex text-center items-center justify-center">{item.name}</span>
                <div className="flex pt-4 justify-center">
                  <img src={facebookIcon} alt="Facebook Icon" className="hover:shadow-md hover:shadow-green-300 cursor-pointer" />
                  <img src={twitterIcon} alt="Twitter Icon" className="hover:shadow-md hover:shadow-green-300 cursor-pointer" />
                  <img src={linkedinIcon} alt="Linkedin Icon" className="hover:shadow-md hover:shadow-green-300 cursor-pointer" />
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </section>

  );
};

export default Doctors;
