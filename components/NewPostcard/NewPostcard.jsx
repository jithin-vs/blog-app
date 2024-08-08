"use client";
import React, { useState,useRef } from "react";
import axios from "axios";
import { LuImage } from "react-icons/lu";
import { MdOutlineEmojiEmotions, MdOutlinePoll } from "react-icons/md";
import { useSession } from "next-auth/react";

const NewPostcard = () => {
  const [blogPost, setBlogPost] = useState({
    title: "",
    content: "",
    username: "",
    file:""
  });

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBlogPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = blogPost.title;
    const content = blogPost.content;
    try {
      const response = await axios.post("/api/addPost", {
        title,
        content,
      });
      console.log(response);
      if (response.status === 200) {
        const form = e.target;
        form.reset();
        router.push("/login");
      }
    } catch (error) {
      console.log("error:\n", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-h-[50vh] mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        {/* textarea */}
        <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="block w-full px-0 py-2 text-sm text-gray-800 border-gray-300 rounded-lg dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Title"
            value={blogPost.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <textarea
            id="editor"
            rows="8"
            name="content"
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write your thoughts..."
            value={blogPost.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* bottom actions */}
        <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
              <div>
                <button
                  onClick={handleButtonClick}
                  type="button"
                  className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <LuImage />
                  <span className="sr-only">Upload image</span>
                </button>
                <input
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </div>
              <button
                type="button"
                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <MdOutlineEmojiEmotions />
                <span className="sr-only">Add emoji</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
              <button
                type="button"
                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <MdOutlinePoll />
                <span className="sr-only">Add list</span>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewPostcard;
