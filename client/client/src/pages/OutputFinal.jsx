import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const OutputFinal = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const { generateImage, user, setshowlogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!user) {
      setshowlogin(true)
      return
    }

    if (!input) {
      toast.error('Please enter a prompt')
      return
    }

    setLoading(true)

    const generatedImage = await generateImage(input)

    if (generatedImage) {
      setIsImageLoaded(true)
      setImage(generatedImage)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
      <div>
        <div className='relative'>
          <img src={image} className='max-w-sm rounded' />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-[10s] ${loading ? "w-full" : "w-0"
              }`}
          />
        </div>
        <p className={!loading ? 'hidden' : ''}>Loading...</p>
      </div>

      {!isImageLoaded &&
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
          <input
            type='text'
            onChange={e => setInput(e.target.value)}
            value={input}
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
          />
          <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
        </div>
      }

      {isImageLoaded &&
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p
            onClick={() => { setIsImageLoaded(false); setImage(assets.sample_img_1) }}
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'
          >
            Generate Another
          </p>
          <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
        </div>
      }
    </form>
  )
}

export default OutputFinal