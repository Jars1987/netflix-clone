import React, { useRef } from 'react';
import './SignUpScreen.css';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(userAuth => {})
      .catch(e => {
        alert(e.message);
      });
  };

  const signIn = e => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(userAuth => {})
      .catch(e => {
        alert(e.message);
      });
  };

  return (
    <div className='signUpScreen'>
      <form>
        <h1>Sign In</h1>
        <input type='email' placeholder='Email Addres' ref={emailRef} />
        <input type='password' placeholder='Password' ref={passwordRef} />
        <button type='submit' onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className='signUpScreen__gray'>New to Netflix?</span>
          <span className='signUpScreen__link' onClick={register}>
            SignUp now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
