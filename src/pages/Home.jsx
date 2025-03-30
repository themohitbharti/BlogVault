import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Container, PostCard } from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setFilteredPosts(posts.documents);
      }
    });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-800 to-rose-300 text-white py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="block">Unveil Your Ideas</span>
              <span className="block mt-2 animate-pulse">Share Your Voice</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              A sanctuary for thoughts, stories, and everything in between.
            </p>

            {/* Search Bar - White Background */}
            <div className="max-w-3xl mx-auto relative bg-white rounded-full shadow-lg">
              <input
                type="text"
                placeholder="Search for blogs..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <svg
                className="w-6 h-6 absolute right-4 top-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </Container>
      </div>

      {/* Blog Posts Section */}
      <div className="w-full py-12 bg-rose-75">
        <Container>
          {filteredPosts.length === 0 && (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-gray-700">
                No posts found matching your search
              </h2>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <>
              {/* Fancy section header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold inline-block relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-rose-400">
                    Explore Our Posts
                  </span>
                  <div className="h-1 w-1/2 bg-gradient-to-r from-red-500 to-purple-600 absolute bottom-0 left-1/4 rounded-full"></div>
                </h2>
              </div>

              {/* Posts grid with improved styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.$id}
                    className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
}

export default Home;
