import React from 'react'

const CreateListing: React.FC = () => {
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
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-90'>Create Listing</button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing
