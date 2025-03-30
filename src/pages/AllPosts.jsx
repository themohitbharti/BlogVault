import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import service from "../appwrite/conf";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.$id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full py-8 bg-rose-50 min-h-screen">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">All Blogs</h1>
          <div className="flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full px-4 py-3 rounded-lg border-2 border-rose-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white"
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        {filteredPosts.length > 0 ? (
          <div className="flex flex-wrap">
            {filteredPosts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform duration-300 hover:scale-[1.02]"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <h2 className="text-xl text-gray-600">
              No posts found matching your search
            </h2>
            <p className="text-gray-500 mt-2">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
