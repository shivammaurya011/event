import React from 'react';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../config/Firebase'; // Assuming you export `app` from Firebase config
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const userData = {
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL
            };
            const res = await fetch('/api/user/google', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!res.ok) {
                throw new Error('Failed to authenticate with server');
            } else {
                const data = await res.json();
                console.log(data.user)
                dispatch(signinSuccess(data.user));
                navigate('/');
            }

        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    };

    return (
        <Button onClick={handleGoogleClick} type="button" gradientDuoTone="pinkToOrange" outline>
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue with Google
        </Button>
    );
}

export default OAuth;
