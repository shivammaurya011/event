import React from 'react'
import {Link} from 'react-router-dom'
import {Button, TextInput} from 'flowbite-react'
function Signup() {
  return (
    <div className=' w-[40%] m-auto mt-[5%] p-10 border rounded shadow-2xl'>
      <form className='flex flex-col gap-4'>
        <TextInput type='text' placeholder='Full Name' id='fullName' name='fullName'/>
        <TextInput type='text' placeholder='Email' id='email' name='email'/>
        <TextInput type='text' placeholder='Password' id='password' name='password'/>
        <Button type='submit' gradientDuoTone={'purpleToPink'}>Sign Up</Button>
      </form>
      <div className='mt-6 w-full flex justify-center text-base font-medium dark:text-white gap-2 items-center'>
        <span>Have an account?</span>
        <Link to={'/signin'} className='text-blue-500 hover:underline'>Sign In</Link>
      </div>
    </div>
  )
}

export default Signup
