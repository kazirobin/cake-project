import React from 'react'

const WishGenerator = () => {
  return (
    <>
    <div className='bg-linear-to-br from-pink-50 py-20'>
        <div className='container mx-auto text-center mb-8'>
          <h1 className='text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text'>AI Wish Generator</h1>
          <p className='text-gray-600 mt-3'>Create heartfelt messages for cakes or generate beautiful wishes for your loved ones in English or Nepali</p>
        </div>
    </div>

      {/* Tabs  */}
      <div className='container mx-auto  py-10'>
        <div className='container mx-auto'>
         <div className='flex justify-center gap-5 mb-8'>
          <button className='px-6 py-2 bg-purple-600 text-white rounded-l-md'>Cake Wishes</button>
          <button className='px-6 py-2 bg-gray-200 text-gray-700'>General Wishes</button>
         </div>
        <p className='text-gray-600 text-center'>Generate longer wishes (40-80 words) for sharing via messages or social media</p>
        </div>
      </div>

      {/* Forms  */}
      <div className='pt-20'>
          <div className='container mx-auto py-10 rounded-2xl shadow-lg p-6'>
           <h2 className="font-semibold text-lg mb-4">Generate Wish</h2>

        {/* Occasion */}
        <div>
          <label htmlFor="occasion" className=' text-gray-600'>Select an occasion:</label>
          <select name="occasion" id="occasion" className='w-full border rounded-lg p-2 mt-1'>
            <option>Select an occasion</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Wedding</option>
            <option>New Year</option>
          </select>
        </div>

        {/* Recipient */}
        <div className='mt-4'>
          <label htmlFor="recipient" className=' text-gray-600'>Recipient's Name:</label>
          <input type="text" id="recipient" name="recipient" placeholder='Enter recipient name' className='w-full border rounded-lg p-2 mt-1' />
        </div> 

        {/* Relationship */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Relationship</label>
          <select className="w-full border rounded-lg p-2 mt-1">
            <option>Select relationship</option>
            <option>Friend</option>
            <option>Mother</option>
            <option>Father</option>
            <option>Brother</option>
            <option>Sister</option>
          </select>
        </div> 

        {/* From Name */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">From Name</label>
          <input placeholder="Your loving family" className="w-full border rounded-lg p-2 mt-1"/>
        </div>


        {/* Tone */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Message Tone</label>
          <select className="w-full border rounded-lg p-2 mt-1">
            <option>Select tone (optional)</option>
            <option>Emotional</option>
            <option>Funny</option>
            <option>Formal</option>
            <option>Romantic</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium">
            ✨ Generate Wish
          </button>

          <button className="px-4 py-2 rounded-lg border text-gray-600"> Clear Form </button>
        </div>


        </div>
      </div>

      {/* Tips */}
    <div className='py-16'>
        <div className="container mx-auto  mt-8 text-sm text-gray-600 ">
          <h3 className="font-semibold mb-2">💡 Tips</h3>

          <ul className="list-disc pl-5 space-y-1">
            <li>
              For birthdays and anniversaries, add age or years for personalized
              messages.
            </li>
            <li>
              For New Year wishes, choose between AD (English) or BS (Nepali)
              calendar.
            </li>
            <li>Cake messages are shorter (15–30 words).</li>
            <li>Wishes are longer (40–80 words) for cards or social media.</li>
          </ul>
        </div>
    </div>

    </>
  )
}

export default WishGenerator