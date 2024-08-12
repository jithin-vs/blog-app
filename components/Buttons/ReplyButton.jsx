import React from "react";
import { TbMessageReply } from "react-icons/tb";

const ReplyButton = () => {
  return (
    <div className="flex items-center mt-4 space-x-4">
      <button
        type="button"
        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
      >
        <TbMessageReply className="mr-1.5" />
        Reply
      </button>
    </div>
  );
};

export default ReplyButton;
