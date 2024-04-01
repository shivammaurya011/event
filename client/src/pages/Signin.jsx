import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Alert, Button, Spinner, TextInput } from 'flowbite-react'; 
import { signinSuccess, signinStart, signinFailure } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Signin() {
  const { isLoading, isError } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signinFailure("Please fill out all fields."));
    }
    try {
      dispatch(signinStart());
      const res = await fetch('/api/user/signin', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(signinFailure(data.message));
      } else {
        dispatch(signinSuccess(data));
        navigate('/');
        setFormData({
          email: '',
          password: ''
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(signinFailure("An error occurred. Please try again later."));
    }
  }
  
  return (
    <div className='w-[40%] mx-auto my-[5%] p-10 border rounded shadow-2xl'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <TextInput type='email' placeholder='Email' id='email' name='email' value={formData.email} onChange={handleChange}/>
        <TextInput type='password' placeholder='Password' id='password' name='password' value={formData.password} onChange={handleChange}/>
        {isError && (
          <Alert className='mt-4' color={'failure'}>{isError}</Alert>
        )}
        <Button type='submit' gradientDuoTone={'purpleToPink'} disabled={isLoading}>
          {isLoading ? (<Spinner size={'sm'}><span className='pl-3'>Loading</span></Spinner>) : 'Sign In'}
        </Button>
      </form>
      <div className='mt-6 w-full flex justify-center text-base font-medium dark:text-white gap-2 items-center'>
        <span>Don't have an account?</span>
        <Link to={'/signup'} className='text-blue-500 hover:underline'>Sign Up</Link>
      </div>
    </div>
  );
}

export default Signin;
