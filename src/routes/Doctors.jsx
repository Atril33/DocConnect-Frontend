import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import { fetchdoctors } from '../redux/doctors/doctorSlice';
import facebookIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';
import linkedinIcon from '../assets/linkedin.png';
import farwordIcon from '../assets/forward.png';

const Doctors = () => {
  const doctorsDispatch = useDispatch();

  const allDoctors = useSelector((state) => state.doctors);
  const finalDoctorsData = allDoctors.doctors;

  useEffect(() => {
    doctorsDispatch(fetchdoctors());
  }, [doctorsDispatch]);

  const forwardArrow = () => {
    const container = document.querySelector('.doctors-listing');

    if (container) {
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (currentScroll + 250 > maxScroll) {
        // If scrolling exceeds the maximum scroll position, reset to the beginning
        container.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        // Scroll by 250 pixels to the left
        container.scrollBy({
          left: 250,
          behavior: 'smooth',
        });
      }
    }
  };

  const backArrow = () => {
    const container = document.querySelector('.doctors-listing');

    if (container) {
      const currentScroll = container.scrollLeft;

      if (currentScroll - 250 < 0) {
        // If scrolling would go before the beginning, scroll to the end
        container.scrollTo({
          left: container.scrollWidth,
          behavior: 'smooth',
        });
      } else {
        // Scroll 250 pixels to the left (backward)
        container.scrollTo({
          left: currentScroll - 250,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      <div className="doctor-container">
        <button type="button" onClick={backArrow} className="p-2 w-7 h-7 bg-[#4ecca3] self-center rounded-s-full">
          <img src={farwordIcon} alt="Farword Icon" className="retrun-back-btn" />
        </button>
        <div className="doctor-list-container">
          <div className="doctor-text-container">

            <h2 className="doctor-title-text">Meet Our Physicians</h2>
            <p className="doctor-paragraph-text">Please select a doctor for an appointment</p>
          </div>

          <div className="doctors-listing">
            {finalDoctorsData.map((item) => (
              <Link to={`/doctor/${item.id}`} className="doctor-box" key={item.id}>
                <img src={item.photo_url} className="doctor-image" alt={item.name} />
                <h3 className="doctor-name">{item.name}</h3>
                <div className="social-icon-container">
                  <img src={facebookIcon} alt="Facebook Icon" className="social-icon" />
                  <img src={twitterIcon} alt="Twitter Icon" className="social-icon" />
                  <img src={linkedinIcon} alt="Linkedin Icon" className="social-icon" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <button type="button" onClick={forwardArrow} className="p-2 w-7 h-7 bg-[#4ecca3] self-center rounded-s-full">
          <img src={farwordIcon} alt="Farword Icon" className="w-5" />
        </button>
      </div>
    </>
  );
};

export default Doctors;
