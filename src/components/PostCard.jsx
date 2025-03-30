import React from "react";
import appwriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <div className="p-1 rounded-xl bg-gradient-to-br from-[#e85254] to-[#fabbbf] hover:from-[#fabbbf] hover:to-[#e85254] transition-all duration-500">
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
          <div className="w-full h-48 overflow-hidden">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-5 bg-[#5e1e2c]/5">
            <h2 className="text-xl font-bold text-[#5e1e2c] mb-3">{title}</h2>
            <div className="flex justify-between items-center">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-[#fabbbf] bg-[#5e1e2c] rounded-full">
                Blog
              </span>
              <span className="text-sm text-[#e85254] font-medium">
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
