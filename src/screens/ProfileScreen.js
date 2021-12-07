import React from 'react';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import { selectUser } from '../state/features/userSlice';
import './ProfileScreen.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

import PlanScreen from './PlanScreen';

function ProfileScreen() {
  const user = useSelector(selectUser);

  const signOutUser = () => {
    signOut(auth);
  };

  return (
    <div className='profileScreen'>
      <Nav />
      <div className='profileScreen__body'>
        <h1>Edit Profile</h1>
        <div className='profileScreen__info'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            alt='Netflix Avatar'
          />
          <div className='profileScreen__details'>
            <h2>{user.email}</h2>
            <div className='profileScreen__plans'>
              <h3>Plans</h3>

              <PlanScreen />

              <button className='profileScreen__signOut' onClick={signOutUser}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
