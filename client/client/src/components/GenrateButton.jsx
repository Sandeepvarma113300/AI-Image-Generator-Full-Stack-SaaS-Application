import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
const GenrateButton = () => {
   const {user,setshowlogin}=useContext(AppContext);
    const navigate=useNavigate();
    const onClickHandler=()=>{
        if(user){
                navigate('/result')
        }
        else{
            setshowlogin(true)
        }
    }
  return (
    <div className='text-center pb-16'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now</h1>
        <button className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500' onClick={onClickHandler}>Genrate Images
            <img src={assets.star_group} className='h-6'/>
        </button>
    </div>
  )
}

export default GenrateButton