'use client'

import React, { useState } from "react";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2"; 

const CommentButton = () => {
  const [showComments, setShowComments] = useState(false);

  const handleComment = () => {
    setShowComments((prev) => !prev);
  };
  return (
    <button
      type="button"
      onClick={handleComment}
      className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
    >
      <HiOutlineChatBubbleOvalLeft size={18} className="mr-2" />
    </button>
  );
};

export default CommentButton;
