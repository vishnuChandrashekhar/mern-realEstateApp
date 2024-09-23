import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'


const Header: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to={'/'}>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Realtour</span>
            <span  className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-1.5 rounded-lg flex items-center justify-between'>
          <input type="text" placeholder='Search.....' className='bg-transparent p-0.5 focus:outline-none w-24 sm:w-64'/>
          <FaSearch className='text-slate-700 cursor-pointer' />
        </form>
        <ul className='flex gap-4 cursor-pointer'>
        <Link to={'/'}>
          <li className='hidden sm:inline text-slate-700 hover:underline font-semibold active:font-bold' >Home</li>
        </Link>
        <Link to={'/about'}>
          <li className='hidden sm:inline text-slate-700 hover:underline font-semibold' >About</li>
        </Link>
        <Link to={'/profile'}>
          { currentUser && currentUser.avatar ? (
            <img className='rounded-full h-7 w-7 object-cover border' src={ currentUser.avatar } alt="profile-pic" />
          ) : ( 
          <Link to={'/signin'}><li className='text-slate-700 hover:underline font-semibold'>sign in</li> </Link>
          )}
        </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header