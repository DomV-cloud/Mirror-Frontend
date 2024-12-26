function MainContent({ selectedPost }) {
    return (
      <main className="flex-1 bg-white shadow-md p-6">
        {selectedPost ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">{selectedPost.title}</h1>
            <p className="text-sm text-gray-500 mb-6">{selectedPost.date}</p>
            <p className="text-gray-800">
              This is the detailed content of the blog post titled{" "}
              <strong>{selectedPost.title}</strong>. You can write the full content of the
              post here.
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Select a post to view its content.</p>
        )}
      </main>
    );
  }
  
  export default MainContent;
  