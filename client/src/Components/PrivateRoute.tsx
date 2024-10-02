import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { Outlet, Navigate } from 'react-router-dom'


function PrivateRouute() {

  const { currentUser } = useSelector((state: RootState) => state.user)

  return currentUser ? <Outlet /> : <Navigate to={'/signin'} />
}

export default PrivateRouute

