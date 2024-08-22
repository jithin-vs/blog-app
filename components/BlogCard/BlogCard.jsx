"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { GoThumbsup } from "react-icons/go";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import Comment from "../Comments/Comment";
import Loader from "../Loading/Loader";
import axios from "axios";

const BlogCard = ({ params }) => {
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
  
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">From the blog</h1>
  
        {blogData ? (
          <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <Image
              src={blogData.imageUrl || "https://via.placeholder.com/600"}
              alt="Blog Image"
              width={500}
              height={300}
              className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
            />
  
            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
              <p className="text-sm text-blue-500 uppercase">Category</p>
  
              <Link
                href={`/post/${blogData._id}`}
                className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
              >
                {blogData.title}
              </Link>
  
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                {blogData.content.length > 150 ? `${blogData.content.substring(0, 150)}...` : blogData.content}
              </p>
  
              <Link href={`/post/${blogData._id}`} className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">
                Read more
              </Link>
  
              <div className="flex items-center mt-6">
                <Image
                  src={blogData.author.profilePic || "https://via.placeholder.com/40"}
                  alt={blogData.author.name}
                  width={40}
                  height={40}
                  className="object-cover object-center w-10 h-10 rounded-full"
                />
                <div className="mx-4">
                  <h1 className="text-sm text-gray-700 dark:text-gray-200">{blogData.author.name}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lead Developer</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No blogs available.</p>
        )}
      </div>
    </section>
  );
  
};

export default BlogCard;
