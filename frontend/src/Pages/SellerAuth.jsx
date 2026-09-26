import React, { useState } from 'react'
import SellerSignin from '../Model/SellerSignin.jsx'
import SellerSignup from '../Model/SellerSignup.jsx'
import AuthShell from '../Components/ui/AuthShell.jsx'

// Optimized photos served from /public.
const signupImage = "/L13.webp"
const signinImage = "/L6.webp"

export const SellerAuth = () => {
    const [authType, setAuthType] = useState(
      new URLSearchParams(window.location.search).get("expired") ? "signin" : "signup"
    )
  return (
    <AuthShell
      image={authType === "signup" ? signupImage : signinImage}
      eyebrow="Hotel Owner Portal"
      caption={authType === "signup" ? "List your property and start receiving bookings." : "Manage your hotels and bookings."}
    >
        {
            authType == "signup"?
            <SellerSignup authType = {setAuthType} />
            :
            <SellerSignin authType = {setAuthType} />
        }
    </AuthShell>
  )
}
export default SellerAuth
