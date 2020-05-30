import React from 'react';
import LoginBox from '../../components/LoginBox';
import AuthManager from "../../utils/AuthManager";

export default function Login() {
  const auth = AuthManager();
  return (
    <div>
      <LoginBox />
    </div>
  )
};

