import { useSelector } from "react-redux"
import { RootState } from "../Redux/store"
import { useRef, useState, useEffect } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"
import { UserSchema } from "../../../API/src/Models/user.model"




const Profile: React.FC = () => {

  const { currentUser } = useSelector((state: RootState) => state.user)
  const fileRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | undefined>(undefined)
  const [filePercent, setFilePercent] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState<boolean>(false)
  const [formData, setFormData] = useState<Partial<UserSchema>>({});
  // const [ showUploadMessage, setShowUploadMessage ] = useState<boolean>(false)


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

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        })
      }
    );

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
      <form className="flex flex-col gap-4">
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
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-85 disabled:opacity-75">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
    </div>
  </div>

  )
}

export default Profile