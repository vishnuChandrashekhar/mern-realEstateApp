import e from 'express'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { app } from '../firebase'
import { ListingSchema } from '../../../API/src/Models/listing.model'



const CreateListing: React.FC = () => {

  const [files, setFiles] = useState<File[]>([])

  const [formData, setFormData] = useState<Partial<ListingSchema>>({
    imageURLs: []
  })
  const [ uploading, setUploding ] = useState<boolean>(false)

  const [ imageUploadError, setImageUploadError ] = useState<boolean | string >(false)

  // function
  const handleImageSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if(files.length > 0 && files.length + (formData.imageURLs?.length ?? 0) < 7) {
      setImageUploadError(false)

      // Testing the functionality for uploading the image file loacally till create isting is completed
      const newImageURLs: string[] = []

      for(let i = 0; i < files.length; i++) {
        if(files[i]){
          newImageURLs.push(URL.createObjectURL(files[i]))
        }
      }

      setFormData({
        ...formData,
        imageURLs: formData.imageURLs?.concat(newImageURLs) ?? newImageURLs
      })

      // Storing the image in firebase, this can be used later when creating the create listing functionality, using this there would be more appropriate that here, avoid bugs.

      // const promises: Promise<string>[] = []

      // for(let i = 0; i < files.length; i++){
      //   if(files[i]){
      //     promises.push(storeImage(files[i]))
      //   }
      // }

      // Promise.all(promises).then((urls) => {
      //   setFormData({ ...formData, imageURLs: formData.imageURLs?.concat(urls as string[]) ?? urls })
      //   setImageUploadError(false)
      //   setUploding(false)
      // }).catch((err)=> setImageUploadError(`image upload failed (2 mb max per image)`))
    } else {
      setImageUploadError(`You can only upload 6 images per listing`)
      setUploding(false)
    }
  }

  // function
  const storeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject)=> {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed',(snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress} % done`)
      }, 
      (error) => {
        reject(error)
      },
      () => {
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
       })
      })
    })
  }

  // function
  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs?.filter((_, i) => i !== index)
    })
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a listing</h1>
      <form action="" className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input type="text" id='name' placeholder='Name' className='border p-3 rounded-lg' maxLength={62} minLength={10} required/>
          <input type="text" id='description' placeholder='Description' className='border p-3 rounded-lg' required/>
          <input type="text" id='address' placeholder='Address' className='border p-3 rounded-lg' required/>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className='w-5' id='sale' />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className='w-5' id='rent' />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className='w-5' id='parking' />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className='w-5' id='furnished' />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className='w-5' id='offer' />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-3 items-center">
              <input type="number" className ="p-3 border border-gray-300 rounded-lg" id="bedrooms" min={1} max={10} required />
              <p>Beds</p>
            </div>
            <div className="flex gap-3 items-center">
              <input type="number" className ="p-3 border border-gray-300 rounded-lg" id="bathrooms" min={1} max={10} required />
              <p>Baths</p>
            </div>
            <div className="flex gap-3 items-center">
              <input type="number" className ="p-3 border border-gray-300 rounded-lg" id="regularPrice" min={1} max={10} required />
              <div className="flex flex-col gap-1">
                <p>Regular Price</p>
                <span className='text-xs'>($/month)</span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <input type="number" className ="p-3 border border-gray-300 rounded-lg" id="discountedPrice" min={1} max={10} required />
              <div className="flex flex-col gap-1">
                <p>Discounted Price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images: <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (Maximum 6 images)</span> </p>
          <div className="flex gap-4">
            <input onChange={(e) => {
              if(e.target.files) {
                setFiles(Array.from(e.target.files)) //Convert FileList to Array: Array.from(e.target.files) converts the FileList into a regular array that can be used in state.
              }
            }} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' disabled={uploading}  >{ uploading ? 'Uploading...' : 'Upload' }</button>
          </div>
          {
            (formData.imageURLs?.length ?? 0) > 0 && formData.imageURLs?.map((url, index)=> (
              <div key={url} className="flex justify-between items-center p-3 border">
                <img src={url} alt="listing image" className='h-20 w-30 object-contain rounded-lg hover:opacity-85' />
                <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-65'>Delete</button>
              </div>
            ))
          }
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-90'>Create Listing</button>
          <p className='text-red-700 text-sm'>{ imageUploadError ? imageUploadError : null }</p>
        </div>
      </form>
    </main>
  )
}

export default CreateListing
