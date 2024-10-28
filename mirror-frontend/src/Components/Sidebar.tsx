import { Link } from 'react-router-dom';
import AnalyticsIcon from './Icons/AnalyticsIcon';
import FeedbackIcon from './Icons/FeedbackIcon';
import HomeIcon from './Icons/HomeIcon';
import HelpIcon from './Icons/HelpIcon';
import PersonalBlogIcon from './Icons/PersonalBlogIcon';
import ResourcesIcon from './Icons/ResourcesIcon';
import SettingsIcon from './Icons/SettingsIcon';
import StatisticsIcon from './Icons/StatisticsIcon';

function Sidebar() {
  const menuItems = [
    {
      label: 'Home',
      to: '/',
      icon: <HomeIcon />,
    },
    {
      label: 'Statistics',
      to: '/statistics',
      icon: <StatisticsIcon />,
    },
    {
      label: 'Analytics',
      to: '/analytics',
      icon: <AnalyticsIcon />,
    },
    {
      label: 'Personal blog',
      to: '/blog',
      icon: <PersonalBlogIcon />,
    },
    {
      label: 'My Resources',
      to: '/resources',
      icon: <ResourcesIcon />,
    },
    {
      label: 'Settings',
      to: '/settings',
      icon: <SettingsIcon />,
    },
    {
      label: 'Feedback',
      to: '/feedback',
      icon: <FeedbackIcon />,
    },
    {
      label: 'Help',
      to: '/help',
      icon: <HelpIcon />,
    },
  ];

  return (
    <aside className="w-64 bg-white h-screen shadow-md flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Chatbot Dashboard</h1>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.to} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="mr-3">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 text-center text-gray-500">
        <p>Inspired by <a href="https://galichat.com" className="text-blue-500 underline">galichat.com</a></p>
      </div>
    </aside>
  );
}

export default Sidebar;
