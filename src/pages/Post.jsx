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
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-amber-600"></div>
              <p className="font-medium text-amber-600">Loading post...</p>
            </div>
          </div>
        ) : post ? (
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Image container - full width on mobile, 45% on larger screens */}
            <div className="relative mb-4 w-full rounded-xl border p-2 md:mb-0 md:w-5/12">
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="h-auto w-full rounded-xl object-cover"
              />

              {isAuthor && (
                <div className="absolute top-4 right-4 flex flex-col gap-2 sm:flex-row">
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
              <div className="relative h-full overflow-hidden rounded-lg border-l-4 border-amber-600 bg-[#fffdf6] p-6 shadow-md">
                {/* Decorative paper clip */}
                <div className="absolute -top-1 right-8 z-10 h-12 w-6 rotate-6 transform rounded-b-full bg-gray-400 opacity-60"></div>

                {/* Title section with notebook styling */}
                <div className="relative mb-8">
                  <h1 className="font-handwriting mb-2 text-3xl leading-snug text-gray-800 md:text-4xl">
                    {post.title}
                  </h1>
                  <div className="mt-2 font-mono text-sm text-amber-700 italic">
                    Published on{" "}
                    {new Date(post.$createdAt).toLocaleDateString()}
                  </div>
                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-amber-200 to-amber-50"></div>
                </div>

                {/* Content area with notebook paper styling */}
                <div
                  className="browser-css prose font-notepad max-w-none leading-relaxed text-gray-700"
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
                <div className="relative mt-6 h-4 w-full bg-[#fffdf6]">
                  <div className="absolute bottom-0 left-0 h-4 w-full overflow-hidden">
                    <div
                      className="h-8 w-full bg-[#fffdf6]"
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
          <div className="flex min-h-[60vh] items-center justify-center">
            <p className="text-gray-500">Post not found</p>
          </div>
        )}
      </Container>
    </div>
  );
}
