import { Button } from 'flowbite-react'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { GoogleAuthProvider,getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'}); // this will ask for selecting an acount everytime...
        // now we will open the popup window 
        try {
          const getResultsfromGoogle = await signInWithPopup(auth,provider);
          // instead of console logging we want to send this data to our backend 
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name: getResultsfromGoogle.user.displayName,
              email: getResultsfromGoogle.user.email,
              googlePhotoUrl: getResultsfromGoogle.user.photoURL,
            }),
          })

          const data = await res.json();
          if(res.ok){
            dispatch(signInSuccess(data));
            navigate('/')
          }
        } catch (error) {
          dispatch(signInFailure(error.message));
        }
  }
  return (
    <Button color='gray' type='button' outline onClick={handleGoogleClick}>
      <FaGoogle className='w-6 h-6 mr-3'/>
      Continue with Google
    </Button>
  )
}
