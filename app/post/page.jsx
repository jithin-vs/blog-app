'use client';

import CommentButton from "@/components/Buttons/CommentButton";
import LikeButton from "@/components/Buttons/LikeButton";
import CommentSection from "@/components/Comments/CommentSection";
import React, { useState, useEffect } from "react";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import axios from 'axios';
import Image from "next/image";

const BlogPage = ({ blogId }) => {
  const [showComments, setShowComments] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/api/blogs`);
        setBlogData(response.data.blogs[0]);
        console.log(response.data.blogs[0].author);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog data:", err);
        setError('Failed to load blog post.');
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const changeDateFormat=(postTime)=>{
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(postTime).toLocaleDateString('en-GB', options);
  }
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:flex lg:-mx-6">
          <div className="lg:w-3/4 lg:px-6">
            <Image
              className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl"
              src={blogData.imageUrl || '/default-image-url.png'}
              alt={blogData.title}
              height={100}
              width={100}
            />
  
            <div>
              <p className="mt-6 text-sm text-blue-500 uppercase">
                {blogData.category || 'Uncategorized'}
              </p>
  
              <h1 className="max-w-lg mt-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
                {blogData.title}
              </h1>
  
              <div className="flex items-center mt-6">
                <Image
                  className="object-cover object-center w-10 h-10 rounded-full"
                  src={blogData.author.profilePic || '/default-profile-pic.png'}
                  alt={blogData.author.name}
                  height={100}
                  width={100}
                />
  
                <div className="mx-4">
                  <h1 className="text-sm text-gray-700 dark:text-gray-200">
                    {blogData.author.name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Posted on {changeDateFormat(blogData.postTime)}
                  </p>
                </div>
              </div>
  
              {/* Blog content */}
              <div className="mt-6 text-gray-700 dark:text-gray-200">
                {blogData.content}
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center mt-4">
            <LikeButton likes={blogData.likes} />
            <button
              type="button"
              onClick={() => setShowComments((prev) => !prev)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
            >
              <HiOutlineChatBubbleOvalLeft size={18} className="mr-2" />
              Comments ({blogData.numComments})
            </button>
          </div>
          {showComments && <CommentSection blogId={blogId} />}
        </div>
      </div>
    </section>
  );  
};

export default BlogPage;
