import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Account from './pages/account';
import CreateAccount from './pages/createAccount';
import Login from './pages/login';
import Send from './pages/send';
import SignUp from './pages/signup';
import Main from './pages/main';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="main" element={<Main />}/>
          <Route path="accounts" element={<Account/>} />
          <Route path="signup" element={<SignUp/>}/>
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="login" element={<Login />} />
          <Route path="send" element={<Send />} />
        </Routes>
      </BrowserRouter>
);

reportWebVitals();
