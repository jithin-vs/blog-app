import React from "react";
import styles from "./Comment.module.css";
import SendButton from "../Buttons/SendButton";

const Comment = () => {
  return (
    <form className="mt-4 flex items-center space-x-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <textarea
        id="message"
        rows="2"
        className="flex-1 p-2.5 text-sm resize-none text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Leave a comment..."
      ></textarea>
      <SendButton />
    </form>
  );
};

export default Comment;
