'use client'

import React, { useState } from "react";
import { GoThumbsup } from "react-icons/go";

const LikeButton = () => {
  const [likeCount, setLikeCount] = useState(0);
  const handleLike = () => {
    if (likeCount === 0) return setLikeCount(1);
    return setLikeCount(0);
  };
  return (
    <button
      type="button"
      onClick={handleLike}
      className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
    >
      <GoThumbsup size={18} className="mr-2" />
      <span>Like {likeCount > 0 && `(${likeCount})`}</span>
    </button>
  );
};

export default LikeButton;
