import React from 'react';
import LoginBox from '../../components/LoginBox';
import LoginBanner from '../../components/LoginBanner';
import './style.css';

function Login() {
  return (
    <div>
      <LoginBanner />
      <LoginBox />
    </div>
  )
}

export default Login;