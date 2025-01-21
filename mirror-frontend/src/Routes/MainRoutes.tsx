import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "../Components/Loaders/Loader";
import Layout from "../Components/Layout";
import NotFound from "../Pages/StatusPages/NotFoundPage/NotFound";
import LoginPage from "../Pages/LoginPage/Login";
import Register from "../Pages/RegisterPage/Register";
import MemoryPage from "../Pages/SidebarPages/MemoriesPage/MemoriesPage";

const Home = lazy(() => import("../Pages/SidebarPages/HomePage"));
const Help = lazy(() => import("../Pages/SidebarPages/HelpPage"));
const Settings = lazy(() => import("../Pages/SidebarPages/SettingsPage"));

const MainRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users/:userId/memories" element={<MemoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default MainRoutes;
