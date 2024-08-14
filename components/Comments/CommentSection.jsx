"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostButton from "../Buttons/PostButton";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import ReplyButton from "../Buttons/ReplyButton";
import SendButton from "../Buttons/SendButton";
import Dropdown from "../DropDown/Dropdown";

const CommentSection = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/comments");
        console.log(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Comment can't be empty!");
      return;
    }
    const commentData = {
      blogId: blogId,
      comment: comment,
    };
    console.log(commentData);
    try {
      const response = await axios.post("/api/omments", commentData);
      console.log(response);
      if (response.status === 200) {
        alert("Comment posted successfully!");
        setComment("");
      } else {
        alert("Failed to post comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment._id !== commentId));
  };
  const changeDateFormat = (postTime) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(postTime).toLocaleDateString("en-GB", options);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mr-4 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion (20)
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="3"
              className="px-0 w-full resize-none text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <SendButton />
          </div>
        </form>
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Michael Gough"
                />
                Michael Gough
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time
                  pubdate="true"
                  dateTime="2022-02-08"
                  title="February 8th, 2022"
                >
                  Feb. 8, 2022
                </time>
              </p>
            </div>
            <Dropdown />
          </footer>
          <p className="text-gray-500 dark:text-gray-400">
            Very straight-to-point article. Really worth time reading. Thank
            you! But tools are just the instruments for the UX designers. The
            knowledge of the design tools are as important as the creation of
            the design strategy.
          </p>
          <ReplyButton />
        </article>
        <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="Jese Leos"
                />
                Jese Leos
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time
                  pubdate="true"
                  dateTime="2022-02-12"
                  title="February 12th, 2022"
                >
                  Feb. 12, 2022
                </time>
              </p>
            </div>
            <button
              id="dropdownComment2Button"
              data-dropdown-toggle="dropdownComment2"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <BiDotsHorizontalRounded size={20} />
            </button>
            <div
              id="dropdownComment2"
              className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Remove
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Report
                  </a>
                </li>
              </ul>
            </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">
            Much appreciated! Glad you liked it ☺️ If you would like to see more
            content about UI tools, tips & tricks, please let me know where I
            can improve.
          </p>
          <ReplyButton />
        </article>
        {comments.map((comment) => (
          <article
            key={comment._id}
            className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-4"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={comment.userImage}
                    alt={comment.author.name}
                  />
                  {comment.author.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time
                    pubdate="true"
                    dateTime={comment.createdAt}
                    title={new Date(comment.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                  >
                    {changeDateFormat(comment.createdAt)}
                  </time>
                </p>
              </div>
              <Dropdown blogId={blogId} commentId={comment._id} onDelete={handleDeleteComment}/>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">
              {comment.comment}
            </p>
            <ReplyButton />
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
