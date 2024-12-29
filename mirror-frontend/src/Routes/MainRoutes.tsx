import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Loader from '../Components/Loaders/Loader';
import Layout from '../Components/Layout';
import AuthRoutes from './Authentication/AuthRoutes';
import AppRoutes from './AppRoutes';
import NotFound from '../Pages/StatusPages/NotFoundPage/NotFound';

const MainRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Layout>
          <AuthRoutes />
          <AppRoutes />
          <Routes>
            {/*<Route path="*" element={<NotFound />} /> TODO: FIX NOT FOUND PAGE IS DISPLAYED EVERYWHERE */}
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default MainRoutes;
