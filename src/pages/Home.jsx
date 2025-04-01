import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/conf";
import { Container, PostCard } from "../components/index";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setFilteredPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
      <div className="bg-gradient-to-r from-red-800 to-rose-300 py-20 text-white">
        <Container>
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-extrabold md:text-6xl">
              <span className="block">Unveil Your Ideas</span>
              <span className="mt-2 block animate-pulse">Share Your Voice</span>
            </h1>
            <p className="mb-8 text-xl opacity-90 md:text-2xl">
              A sanctuary for thoughts, stories, and everything in between.
            </p>

            {/* Search Bar - White Background */}
            <div className="relative mx-auto max-w-3xl rounded-full bg-white shadow-lg">
              <input
                type="text"
                placeholder="Search for blogs..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full rounded-full bg-white px-6 py-4 text-lg text-gray-800 focus:ring-2 focus:ring-teal-300 focus:outline-none"
              />
              <svg
                className="absolute top-4 right-4 h-6 w-6 text-gray-500"
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
      <div className="w-full bg-rose-50 py-12">
        <Container>
          {/* Not Authenticated State */}
          {!authStatus && !loading && (
            <div className="py-16 text-center">
              <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-red-100 to-rose-100 p-10 shadow-lg">
                <h2 className="mb-6 bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-4xl font-bold text-transparent">
                  Join the BlogVault Community!
                </h2>
                <p className="mb-8 text-xl text-gray-700">
                  Log in to discover amazing stories and connect with passionate
                  writers.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <a
                    href="/login"
                    className="inline-block transform rounded-full bg-gradient-to-r from-red-500 to-rose-400 px-8 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-rose-500 hover:shadow-lg"
                  >
                    Log In
                  </a>
                  <a
                    href="/signup"
                    className="inline-block transform rounded-full border-2 border-red-500 bg-transparent px-8 py-3 font-bold text-red-500 transition-all duration-300 hover:scale-105 hover:bg-red-50"
                  >
                    Create Account
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* No Search Results State */}
          {authStatus &&
            filteredPosts.length === 0 &&
            searchTerm.trim() !== "" && (
              <div className="py-16 text-center">
                <div className="mx-auto max-w-2xl rounded-xl bg-gradient-to-r from-red-50 to-rose-50 p-8 shadow-md">
                  <h2 className="mb-4 text-3xl font-bold text-gray-700">
                    No posts found matching "{searchTerm}"
                  </h2>
                  <p className="mb-6 text-lg text-gray-600">
                    Try adjusting your search or explore other topics instead.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="rounded-full bg-red-500 px-6 py-2 font-medium text-white transition-colors hover:bg-red-600"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}

          {/* No Posts Yet State (for authenticated users) */}
          {authStatus &&
            posts.length === 0 &&
            searchTerm.trim() === "" &&
            !loading && (
              <div className="py-16 text-center">
                <div className="mx-auto max-w-2xl rounded-xl bg-gradient-to-r from-red-50 to-rose-50 p-8 shadow-md">
                  <h2 className="mb-4 text-3xl font-bold text-gray-700">
                    No posts available yet
                  </h2>
                  <p className="mb-6 text-lg text-gray-600">
                    Be the first to share your thoughts with the community!
                  </p>
                  <a
                    href="/add-post"
                    className="rounded-full bg-red-500 px-6 py-2 font-medium text-white transition-colors hover:bg-red-600"
                  >
                    Create a Post
                  </a>
                </div>
              </div>
            )}

          {/* Posts Display */}
          {filteredPosts.length > 0 && (
            <>
              {/* Fancy section header */}
              <div className="mb-12 text-center">
                <h2 className="relative inline-block text-3xl font-bold">
                  <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
                    Explore Our Posts
                  </span>
                  <div className="absolute bottom-0 left-1/4 h-1 w-1/2 rounded-full bg-gradient-to-r from-red-500 to-purple-600"></div>
                </h2>
              </div>

              {/* Posts grid with improved styling */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
