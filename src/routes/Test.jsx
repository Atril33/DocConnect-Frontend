import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchdoctors } from '../redux/doctors/doctorSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Test = () => {
  const doctorsDispatch = useDispatch();

  const allDoctors = useSelector((state) => state.doctors);
  const finalDoctorsData = allDoctors.doctors;

  useEffect(() => {
    doctorsDispatch(fetchdoctors());
  }, [doctorsDispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...settings}>
        {finalDoctorsData.map((item) => (

          <Link to={`/doctor/${item.id}`} className="flex border w-auto justify-center items-center h-[250px] flex-col bg-[blue]" key={item.id}>
            <img src={item.photo_url} alt={item.name} />

          </Link>

        ))}
      </Slider>
    </>
  );
};

export default Test;
