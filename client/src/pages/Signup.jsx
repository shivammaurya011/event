import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Alert, Button, Spinner, TextInput } from 'flowbite-react'; 

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName:'',
    email:'',
    password:''
  });
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      return setError("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/user/signup', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      } else if (res.ok) {
        navigate('/signin');
        setFormData({
          fullName:'',
          email:'',
          password:''
        });
      }
    } catch(error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-[40%] mx-auto my-[5%] p-10 border rounded shadow-2xl'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <TextInput type='text' placeholder='Full Name' id='fullName' name='fullName' value={formData.fullName} onChange={handleChange}/>
        <TextInput type='email' placeholder='Email' id='email' name='email' value={formData.email} onChange={handleChange}/>
        <TextInput type='password' placeholder='Password' id='password' name='password' value={formData.password} onChange={handleChange}/>
        {error && (
          <Alert className='mt-4' color={'failure'}>{error}</Alert>
        )}
        <Button type='submit' gradientDuoTone={'purpleToPink'} disabled={loading}>
          {loading ? (<Spinner size={'sm'}><span className='pl-3'>Loading</span></Spinner>) : 'Sign Up'}
        </Button>
      </form>
      <div className='mt-6 w-full flex justify-center text-base font-medium dark:text-white gap-2 items-center'>
        <span>Have an account?</span>
        <Link to={'/signin'} className='text-blue-500 hover:underline'>Sign In</Link>
      </div>
    </div>
  );
}

export default Signup;
