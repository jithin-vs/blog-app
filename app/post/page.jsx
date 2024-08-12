'use client';

import CommentButton from "@/components/Buttons/CommentButton";
import LikeButton from "@/components/Buttons/LikeButton";
import CommentSection from "@/components/Comments/CommentSection";
import React, { useState, useEffect } from "react";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import axios from 'axios';

const BlogPage = ({ blogId }) => {
  const [showComments, setShowComments] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/api/blogs`);
        setBlogData(response.data);
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

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:flex lg:-mx-6">
          <div className="lg:w-3/4 lg:px-6">
            <img
              className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl"
              src={blogData.imageUrl || 'default-image-url.jpg'}
              alt={blogData.title}
            />

            <div>
              <p className="mt-6 text-sm text-blue-500 uppercase">
                {blogData.category || 'Uncategorized'}
              </p>

              <h1 className="max-w-lg mt-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
                {blogData.title}
              </h1>

              <div className="flex items-center mt-6">
                <img
                  className="object-cover object-center w-10 h-10 rounded-full"
                  src={blogData.author.profilePic || 'default-profile-pic.jpg'}
                  alt={blogData.author.name}
                />

                <div className="mx-4">
                  <h1 className="text-sm text-gray-700 dark:text-gray-200">
                    {blogData.author.name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Posted on {new Date(blogData.postTime).toLocaleDateString()}
                  </p>
                </div>
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
