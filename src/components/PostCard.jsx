import React from "react";
import appwriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-[#e85254] to-[#fabbbf] p-1 transition-all duration-500 hover:from-[#fabbbf] hover:to-[#e85254]">
      <Link to={`/post/${$id}`}>
        <div className="w-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="h-48 w-full overflow-hidden">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="bg-[#5e1e2c]/5 p-5">
            <h2 className="mb-3 text-xl font-bold text-[#5e1e2c]">{title}</h2>
            <div className="flex items-center justify-between">
              <span className="inline-block rounded-full bg-[#5e1e2c] px-3 py-1 text-xs font-semibold text-[#fabbbf]">
                Blog
              </span>
              <span className="text-sm font-medium text-[#e85254]">
                Read more →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
