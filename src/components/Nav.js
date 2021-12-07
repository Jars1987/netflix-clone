import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserPlan } from '../state/features/userSlice';
import './Nav.css';

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const plan = useSelector(selectUserPlan);

  const homeNavigation = () => {
    if (plan) {
      navigate('/');
    } else {
      navigate('/profile');
    }
  };

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => {
      window.removeEventListener('scroll', transitionNavBar);
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'} `}>
      <div className='nav__contents'>
        <img
          className='nav__logo'
          src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
          alt='Netflix Logo'
          onClick={homeNavigation}
        />
        <img
          className='nav__avatar'
          src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
          alt='Avatar Logo'
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
}

export default Nav;
