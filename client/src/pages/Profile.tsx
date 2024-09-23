import { useSelector } from "react-redux"
import { RootState } from "../Redux/store"


const Profile: React.FC = () => {

  const { currentUser } = useSelector((state: RootState) => state.user)

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser?.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-3" />
        <input type="text" id="username" placeholder="username" className="border p-3 rounded-lg"/>
        <input type="text" id="email" placeholder="email" className="border p-3 rounded-lg"/>
        <input type="text" id="password" placeholder="password" className="border p-3 rounded-lg"/>
        <button className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-85 disabled:opacity-75">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile