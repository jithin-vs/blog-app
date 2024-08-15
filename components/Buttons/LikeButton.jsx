"use client";

import axios from "axios";
import React, { useState } from "react";
import { GoThumbsup } from "react-icons/go";

const LikeButton = ({ likes, blogId}) => {
  const submitLike = async () => {
    try {
      const likeData = {
        id: blogId,
        onModel: "Blog",
      };
      const response = await axios.post("/api/comments/like", { likeData });
       
    } catch (error) {
      console.error("Failed to like comment:", error);
      alert("There was an error liking the comment.");
    }
  };
  return (
    <button
      type="button"
      onClick={submitLike}
      className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
    >
      <GoThumbsup size={18} className="mr-2" />
      <span>Like {likes > 0 && `(${likes})`}</span>
    </button>
  );
};

export default LikeButton;
