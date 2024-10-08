import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Redux/store"
import { useRef, useState, useEffect, ChangeEvent, act, FormEvent } from "react"
import { ErrorObject } from '../../../API/src/utils/error.handler'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"
import { UserSchema } from "../../../API/src/Models/user.model"
import { updateUserStart, updateUserFilure, updateUserSuccess, deleteUserStart, deleteUserFailure, deleteUserSuccess, signoutUserStart, signoutUserFailure, signoutUserSuccess } from "../Redux/user/userSlice"
import { Link } from "react-router-dom"


const Profile: React.FC = () => {

  const dispatch = useDispatch()

  const { currentUser, loading, error } = useSelector((state: RootState) => state.user)
  const fileRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | undefined>(undefined)
  const [filePercent, setFilePercent] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState<boolean>(false)
  const [formData, setFormData] = useState<Partial<UserSchema>>({});
  const [ isUpdateSuccess, setIsUpdateSuccess ] = useState<boolean>(false)

  const handleFileUpload = (file: File | undefined) => {

      if(!file) {
        console.error('No file to upload');
        return
      }

      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed', (snapShot) => {
        const progressInPercent = (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        setFilePercent(Math.round(progressInPercent))
      },

      (error: Error) => {
        setFileUploadError(true)
      },

      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

        setFormData({ ...formData, avatar: downloadURL})
      }
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data: UserSchema | ErrorObject = await res.json()

      if('success' in data && data.success === false){
        dispatch(updateUserFilure(data.message))
      } else {
        dispatch(updateUserSuccess(data as UserSchema))
      }
      setIsUpdateSuccess(true)
    } catch (error: any) {
      dispatch(updateUserFilure(error.message))
    }
  }



  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
        method: 'DELETE'
      })
      const data = await res.json()

      if('success' in data && data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      } else {
        dispatch(deleteUserSuccess())
      }

    } catch (error: any) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {

    interface SignoutSuccessInterface {
      message: string
    }

    try {
      dispatch(signoutUserStart())
      const res = await fetch('/api/auth/signout')
      const data: SignoutSuccessInterface | ErrorObject = await res.json()

      if('success' in data && data.success === false){
        dispatch(signoutUserFailure(data.message))
        return
      } else {
        dispatch(signoutUserSuccess(data))
      }

    } catch (error: any) {
      dispatch(signoutUserFailure(error.message))
    }
  }

  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }
  }, [file])

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 && 
  // request.resource.contentType.matches('image/.*');

  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          hidden
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <img
          onClick={() => fileRef.current?.click()}
          src={formData.avatar || currentUser?.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-3"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error in image upload (Image must be less than 2MB)</span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-600">Image Uploaded</span>
          ): ('')}
        </p>
        {/* <h2 className="text-center text-3xl font-mono capitalize">{ currentUser?.username }</h2> */}
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-85 disabled:opacity-75">
          {loading ? 'Loading...': 'Update'}
        </button>
        <Link className="bg-green-600 text-white rounded-lg uppercase p-3 text-center hover:opacity-90" to={'/create-listing'}>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
    </div>
    <p className="text-red-700 mt-5">{error? error : null}</p>
    <p className="text-green-700 mt-5">{isUpdateSuccess? "User updated successfully!" : null}</p>
  </div>

  )
}

export default Profile