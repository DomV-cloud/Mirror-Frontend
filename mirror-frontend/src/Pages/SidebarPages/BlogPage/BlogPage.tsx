import { useState } from "react";
import Sidebar from "./SidebarBlog";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";

function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

  const postsByMonth = {
    "June 2018": [
      { date: "22 FRI", title: "Something New", description: "This is a brief description of the post.", id: 1 },
      { date: "18 MON", title: "Notes Where I Went", description: "A short recap of my travels.", id: 2 },
    ],
    "May 2018": [
      { date: "13 SUN", title: "Future Projects", description: "Brainstorming ideas for future projects.", id: 3 },
      { date: "10 SUN", title: "Housing / Financial Plan", description: "Reflections on finances and housing.", id: 4 },
    ],
  };

  const handlePostClick = (postId : any) => {
    const allPosts = Object.values(postsByMonth).flat();
    setSelectedPost(allPosts.find((post: any) => post.id === postId));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Levý Sidebar */}
      <Sidebar postsByMonth={postsByMonth} onPostClick={handlePostClick} />

      {/* Hlavní obsah */}
      <MainContent selectedPost={selectedPost} />

      {/* Pravý Sidebar */}
      <RightSidebar />
    </div>
  );
}

export default BlogPage;
