import React from 'react';
import LoginBox from '../../components/LoginBox';
import AuthManager from "../../utils/AuthManager";

function Login() {
  const auth = AuthManager();
  return (
    <div>
      <LoginBox />
    </div>
  )
}

export default Login;