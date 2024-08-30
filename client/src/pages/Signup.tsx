import React from 'react'
import { Link } from 'react-router-dom'


const Signup: React.FC = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' />
        <input type="emial" placeholder='E-Mail' className='border p-3 rounded-lg' id='username' />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='username' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-1 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-600'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup