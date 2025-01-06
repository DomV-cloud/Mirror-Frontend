import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MemoryPage from "../Pages/SidebarPages/MemoriesPage/MemoriesPage";
import SingleMemoryPage from "../Pages/SidebarPages/MemoriesPage/SingleMemoryPage";

const Home = lazy(() => import("../Pages/SidebarPages/HomePage"));
const Help = lazy(() => import("../Pages/SidebarPages/HelpPage"));
const Settings = lazy(() => import("../Pages/SidebarPages/SettingsPage"));

const AppRoutes = () => (
  // DONT FORGET TO ADD PROGRESSES!!!!
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/help" element={<Help />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/users/:userId/memories" element={<MemoryPage />} />
    <Route path="/memories/:memoryId" element={<SingleMemoryPage />} />
  </Routes>
);

export default AppRoutes;
