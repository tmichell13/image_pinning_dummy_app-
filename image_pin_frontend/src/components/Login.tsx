import React, { useEffect } from 'react'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import jwt_decode from 'jwt-decode'

import { client } from '../client'

import loop from '../assets/loop.mp4'
import logo from '../assets/logo.png'

const Login = () => {

  const navigate = useNavigate()

  const clientId : string = (process.env.REACT_APP_GOOGLE_API_TOKEN as string) 

  useEffect(() => {
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleResponse
    }) 

    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large'}
    )
  }, [])


  function handleGoogleResponse(response: any) { // GoogleLoginResponse | GoogleLoginResponseOffline 
    
    let userObject : any = jwt_decode(response.credential)
    
    localStorage.setItem('user', JSON.stringify(userObject))
    
    const { name, sub, picture } = userObject
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace:true })
      })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
          src={loop}
          typeof='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img
              src={logo}
              width='130px'
              alt='logo'
            />
          </div>
          <div className='shadow-2xl'>
            <div id='signInDiv'></div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Login
