"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { GoThumbsup } from "react-icons/go";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import Comment from "../Comments/Comment";

const BlogCard = ({ title, description, image, author }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/api/blogs`,{ cache: false });
        setBlogData(response.data.blogs[0]);
        console.log(blogData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError("Failed to load blog post.");
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  if (loading) {
    return <Loader /> ;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  const handleLike = () => {
    if (likeCount === 0) return setLikeCount(1);
    return setLikeCount(0);
  };

  const handleComment = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="w-full max-h-[50vh] overflow-auto bg-white shadow-md dark:bg-gray-800 flex items-center justify-center">
      {image && (
        <Image
          className="object-cover w-full h-64"
          src={image}
          alt="Article"
          width={500}
          height={300}
        />
      )}

      <div className="p-6">
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            Product
          </span>
          <Link
            href="/post"
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
            role="link"
          >
            I Built A Successful Blog In One Year
          </Link>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
            parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris
            egestas quam volutpat viverra. In pretium nec senectus erat. Et
            malesuada lobortis.
          </p>
        </div>

        <div className="mt-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a
                href="#"
                className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                role="link"
              >
                Jone Doe
              </a>
              <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">
                21 SEP 2015
              </span>
            </div>
            {/* <div className="flex gap-4 items-center">
              <button
                type="button"
                onClick={handleLike}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
              >
                <GoThumbsup size={18} className="mr-2" />
                <span>Like {likeCount > 0 && `(${likeCount})`}</span>
              </button>
              <button
                type="button"
                onClick={handleComment}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
              >
                <HiOutlineChatBubbleOvalLeft size={18} className="mr-2" />
              </button>
            </div> */}
          </div>
          {/* <div className="mt-4 flex flex-1">
              <div className="flex-grow w-full">
                <Comment />
              </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
