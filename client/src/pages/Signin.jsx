import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Alert, Button, Spinner, TextInput } from 'flowbite-react'; 

function Signin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
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
    if (!formData.email || !formData.password) {
      return setError("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/user/signin', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      } else if (res.ok) {
        navigate('/');
        setFormData({
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
        <TextInput type='email' placeholder='Email' id='email' name='email' value={formData.email} onChange={handleChange}/>
        <TextInput type='password' placeholder='Password' id='password' name='password' value={formData.password} onChange={handleChange}/>
        {error && (
          <Alert className='mt-4' color={'failure'}>{error}</Alert>
        )}
        <Button type='submit' gradientDuoTone={'purpleToPink'} disabled={loading}>
          {loading ? (<Spinner size={'sm'}><span className='pl-3'>Loading</span></Spinner>) : 'Sign In'}
        </Button>
      </form>
      <div className='mt-6 w-full flex justify-center text-base font-medium dark:text-white gap-2 items-center'>
        <span>Dont Have an account?</span>
        <Link to={'/signup'} className='text-blue-500 hover:underline'>Sign Up</Link>
      </div>
    </div>
  );
}
export default Signin;
