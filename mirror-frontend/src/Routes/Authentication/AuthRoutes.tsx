import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LoginPage = lazy(() => import('../../Pages/LoginPage/Login'));
const Register = lazy(() => import('../../Pages/RegisterPage/Register'));

const AuthRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default AuthRoutes;
