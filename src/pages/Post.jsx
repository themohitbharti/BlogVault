import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../appwrite/conf";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Button, Container } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return (
    <div className="py-8">
      <Container>
        {loading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
              <p className="text-amber-600 font-medium">Loading post...</p>
            </div>
          </div>
        ) : post ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image container - full width on mobile, 45% on larger screens */}
            <div className="w-full md:w-5/12 relative border rounded-xl p-2 mb-4 md:mb-0">
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-xl w-full h-auto object-cover"
              />

              {isAuthor && (
                <div className="absolute right-4 top-4 flex flex-col sm:flex-row gap-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500" className="w-full sm:w-auto">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    bgColor="bg-red-500"
                    onClick={deletePost}
                    className="w-full sm:w-auto"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Content container - full width on mobile, 55% on larger screens */}
            <div className="w-full md:w-7/12">
              <div className="bg-[#fffdf6] rounded-lg shadow-md p-6 border-l-4 border-amber-600 relative overflow-hidden h-full">
                {/* Decorative paper clip */}
                <div className="absolute -top-1 right-8 w-6 h-12 bg-gray-400 rounded-b-full transform rotate-6 opacity-60 z-10"></div>

                {/* Title section with notebook styling */}
                <div className="mb-8 relative">
                  <h1 className="text-3xl md:text-4xl font-handwriting text-gray-800 mb-2 leading-snug">
                    {post.title}
                  </h1>
                  <div className="text-sm font-mono text-amber-700 mt-2 italic">
                    Published on{" "}
                    {new Date(post.$createdAt).toLocaleDateString()}
                  </div>
                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-200 to-amber-50"></div>
                </div>

                {/* Content area with notebook paper styling */}
                <div
                  className="browser-css prose max-w-none font-notepad leading-relaxed text-gray-700"
                  style={{
                    backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)`,
                    backgroundSize: "100% 32px",
                    lineHeight: "32px",
                    paddingTop: "8px",
                  }}
                >
                  {parse(post.content)}
                </div>

                {/* Torn paper effect at bottom */}
                <div className="h-4 w-full bg-[#fffdf6] mt-6 relative">
                  <div className="absolute bottom-0 left-0 w-full h-4 overflow-hidden">
                    <div
                      className="w-full h-8 bg-[#fffdf6]"
                      style={{
                        maskImage:
                          "radial-gradient(12px at 8px 100%, transparent 0, transparent 6px, black 6px)",
                        maskSize: "24px 8px",
                        maskRepeat: "repeat-x",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[60vh] flex items-center justify-center">
            <p className="text-gray-500">Post not found</p>
          </div>
        )}
      </Container>
    </div>
  );
}
