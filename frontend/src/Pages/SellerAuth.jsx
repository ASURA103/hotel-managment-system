import React, { useState } from 'react'
import SellerSignin from '../Model/SellerSignin.jsx'
import SellerSignup from '../Model/SellerSignup.jsx'
import u from "/L13.jpg"
import i from "/L6.jpg"
export const SellerAuth = () => {
    const [authType, setAuthType] = useState("signup")
  return (
    <div className='w-full h-screen bg-cover bg-center ' style={{ backgroundImage: authType === "signup" ? `url(${u})` : `url(${i})`, height: ``, width: ``, }}>
        {
            authType == "signup"?
            <SellerSignup authType = {setAuthType} />
            :
            <SellerSignin authType = {setAuthType} />

        }
    </div>
  )
}
export default SellerAuth