import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorObject } from '../../../API/src/utils/error.handler'


const Signup: React.FC = () => {

  const [formData, setFormData] = useState<{username?: string, email?:string, password?: string}>({})
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  const [ success, setSuccess ] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  // Intracting with Backend connecting backend and database with frontend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      // Check this line once more the typing must be wrong, it works but not the right way!
      const data = await response.json()

      if(!data.success) {
        setError(data.message)
        setLoading(false)
        return
      }

      setSuccess(true)
      setFormData({})
      
    } catch (error: any) {
      setLoading(false)
      setError(error.message)
      setSuccess(false)
    } finally {
      setLoading(false)
      setError(null)
      alert('User created successfully')
      navigate('/signin')
    }
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>
        <input required type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input required type="emial" placeholder='E-Mail' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input required type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-1 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-600'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-600 font-semibold text-sm'>{error}</p>}
    </div>
  )
}

export default Signup