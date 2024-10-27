// src/routes/AppRoutes.tsx
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Components/Loaders/Loader';

const Home = lazy(() => import('../Pages/HomePage/Home'));
const Register = lazy(() => import('../Pages/RegisterPage/Register'));
const NotFound = lazy(() => import('../Pages/StatusPages/NotFoundPage/NotFound'));

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
