import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserSchema } from '../../../API/src/Models/user.model'


const Signin: React.FC = () => {

  const [formData, setFormData] = useState<{ email?:string, password?: string}>({})
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
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
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })

      if(!response.ok) {
        const errorData = await response.json()
        setError(errorData.message || 'Somethinng went wrong')
        setLoading(false)
        return
      }

      
      // Check this line once more the typing must be wrong, it works but not the right way!
      const data: Omit<UserSchema, 'username'> = await response.json()

      if(data && data.email === formData.email) {
        navigate('/')
      } else {
        setError('Invalid Credentials')
      }
      // if(!data.success) {
      //   setError(data.message)
      //   setLoading(false)
      //   return
      // }
      
    } catch (error: any) {
      setLoading(false)
      setError(error.message)
    } finally {
      setLoading(false)
    }
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>
        <input required type="emial" placeholder='E-Mail' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input required type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-1 mt-5'>
        <p>Dont Have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-600'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-600 font-semibold text-sm'>{error}</p>}
    </div>
  )
}

export default Signin