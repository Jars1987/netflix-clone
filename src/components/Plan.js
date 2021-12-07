import React from 'react';
import './Plan.css';

function Plan({ name, description, subscribed, loadCheckout }) {
  return (
    <div className='plan__container'>
      <div className='plan__details'>
        <h5>{name}</h5>
        <h6>{description}</h6>
      </div>
      <button
        className={`plan__button${subscribed ? 'Subscribed' : 'Unsubscribed'}`}
        onClick={loadCheckout}>
        {subscribed ? 'Current Package' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Plan;
