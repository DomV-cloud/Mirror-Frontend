import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Components/Loaders/Loader';
import Layout from '../Components/Layout';

const Home = lazy(() => import('../Pages/SidebarPages/HomePage'));
const Register = lazy(() => import('../Pages/RegisterPage/Register'));
const NotFound = lazy(() => import('../Pages/StatusPages/NotFoundPage/NotFound'));
const Help = lazy(() => import('../Pages/SidebarPages/HelpPage'));
const Resources = lazy(() => import('../Pages/SidebarPages/ResourcesPage'));
const Settings = lazy(() => import('../Pages/SidebarPages/SettingsPage'));
const Analytics = lazy(() => import('../Pages/SidebarPages/AnalyticsPage'));
const Feedback = lazy(() => import('../Pages/SidebarPages/FeedbackPage'));
const Statistics = lazy(() => import('../Pages/SidebarPages/StatisticsPage'));
const Blog = lazy(() => import('../Pages/SidebarPages/BlogPage'));
const LoginPage = lazy(() => import('../Pages/LoginPage/Login'));
const MyProgressPage = lazy(() => import('../Pages/MyProgressPage/MyProgressPage'));

const AppRoutes = () => {
  return (
    <Router>
    <Suspense fallback={<Loader />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<Help />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/progress/get/:progressId" element={<MyProgressPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  </Router>
  );
};

export default AppRoutes;
