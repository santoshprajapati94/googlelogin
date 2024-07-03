import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState, useEffect } from 'react';
import { useGoogleLogin  } from '@react-oauth/google';
import axios from 'axios';

export const GoogleAuth = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [user , setUser] = useState([]);
    const [profile,setProfile] = useState([]);
  
    const responseMessage = (response) => {
      console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };
    const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });
  useEffect(()=>{
  
      if(user){
        axios
              .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                  headers: {
                      Authorization: `Bearer ${user.access_token}`,
                      Accept: 'application/json'
                  }
              })
              .then((res) => {
                  setProfile(res.data);
              })
              .catch((err) => console.log(err));
              }
  },[user])
    return (
        <>
        <div className="main-form">
            <form>
                <h3>Login Form</h3>
                <div className='input-wrapper'>
                    <label htmlFor="email">
                        Enter Email
                    </label>
                    <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder='Enter Email'/>
                </div>
                <div className='input-wrapper icon'>
                    <label htmlFor="password">
                        Enter Password
                    </label>
                    <input
                        className='password'
                        placeholder='Enter Password'
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id='password'
                   />
                    <span
                        className='visibilityIcon'
                        onClick={handleClickShowPassword}
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                </div>
                <div className='input-wrapper'>
                    <button type='submit' className='loggedbtn'>Log In</button>
                </div>
                <div className="btn-flex">
                <button type="button" className='loggedbtn' onClick={()=>login()}><GoogleIcon/></button>
                <button type="button" className='loggedbtn'><GitHubIcon/></button>
                </div>
            </form>
            </div>
            <div>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    
                
                </div>
            ) : null}
        </div>
        </>

    );
}
export default GoogleAuth;