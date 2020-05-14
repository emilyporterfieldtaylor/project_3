import React from 'react';
import LoginBox from '../../components/LoginBox';
import './style.css';
import LoginBanner from '../../components/LoginBanner';

function Login() {
  return (
    <div>
      <LoginBanner />
      <LoginBox />
    </div>
  )
}

export default Login;