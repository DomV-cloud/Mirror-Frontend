function SidebarBlog({ postsByMonth = {}, onPostClick }) {
    // Kontrola, zda je postsByMonth objekt
    if (typeof postsByMonth !== "object" || postsByMonth === null) {
      console.error("postsByMonth musí být objekt.");
      return <div className="p-4 text-red-500">Invalid data provided.</div>;
    }
  
    return (
      <aside className="w-1/4 bg-white shadow-lg p-4 overflow-y-auto">
        <div className="space-y-6">
          {Object.entries(postsByMonth).map(([month, posts]) => (
            <div key={month}>
              {/* Nadpis měsíce */}
              <h3 className="text-md font-bold text-gray-700 mb-2">{month}</h3>
  
              {/* Příspěvky v měsíci */}
              <div className="space-y-4">
                {Array.isArray(posts) ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="cursor-pointer p-4 bg-gray-50 rounded-md hover:bg-blue-50"
                      onClick={() => onPostClick(post.id)}
                    >
                      <p className="text-sm font-semibold text-blue-600">{post.date}</p>
                      <h4 className="text-base font-bold text-gray-900">{post.title}</h4>
                      <p className="text-sm text-gray-600">{post.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No posts available for {month}.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }
  
  export default SidebarBlog;
  