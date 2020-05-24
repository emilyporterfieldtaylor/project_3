import React from 'react';
import LoginBox from '../../components/LoginBox';
import LoginBanner from '../../components/LoginBanner';
import './style.css';
import AuthManager from "../../utils/AuthManager";

function Login() {
  const auth = AuthManager();
  return (
    <div>
      <LoginBanner />
      <LoginBox />
    </div>
  )
}

export default Login;