import React from 'react'
import { useNavigate } from 'react-router-dom'
import { VscAccount } from 'react-icons/vsc'

 const Footer = () => {
  const navigate = useNavigate() 
  function seller(params) {
    navigate("seller/auth")
  }
  function owner(params) {
    navigate("admin/auth")
  }
  return (
    <div className='flex bg-black text-white text-center  w-[100%] '>
      <div className=' object-cover object-center'>
        <img src="footer.avif" alt="" className=' w-[100vh] object-cover object-center'/>
      </div>
      <div  className='w-[100vh]'>
           <div className=' flex justify-between '>
           <div className='w-1/3 cursor-pointer '>About Us</div>
           <div className='w-1/3 cursor-pointer '>About Us</div>
          
           
           </div>
           
           <div className=' flex justify-between '>
           
           <div className='w-1/3 cursor-pointer ' onClick={owner}> ...Owner...</div>
           <div className='w-1/3 cursor-pointer ' onClick={seller}>Hotel Owner</div> 
           
           </div>
           
           <div className=' flex justify-between '>
           
           <div className='w-1/3 cursor-pointer '>Feedback</div>
           <div className='w-1/3 cursor-pointer '>Feedback</div> 
           
           </div>
           
           <div className=' flex justify-between '>
           
           <div className='w-1/3 cursor-pointer '>services</div>
           <div className='w-1/3 cursor-pointer '>services</div> 
           
           </div>
           </div>

          </div> 


 

  )
}
export default Footer