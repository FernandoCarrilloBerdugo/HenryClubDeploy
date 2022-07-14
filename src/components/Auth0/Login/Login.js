import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { FcGoogle } from "react-icons/fc";
import { jasonWebToken } from '../../../redux/Actions/Action';

export default function LoginButton() {

  const {loginWithRedirect, user} = useAuth0()

  const handleClick= async () => {
    loginWithRedirect({redirectUri: "http://localhost:3000/home"})
  }

  return (
    <button type="button" style={{borderStyle:"solid"}} onClick={handleClick}>
      Log in with 
      <div><FcGoogle /></div>
    </button>
  )
}