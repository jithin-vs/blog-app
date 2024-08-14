import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const Dropdown = ({ blogId ,commentId,onDelete }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Define handler functions for each action
  const handleEdit = () => {
    // Action for Edit
    console.log('Edit action triggered');
  };

  const handleRemove = async () => {
    try {

      const response = await axios.delete("/api/comments", {
        data: { blogId, commentId },
      });
      console.log(response);
      if (response.status === 200) {
        alert("Comment deleted successfully!");
        onDelete(commentId);
        router.refresh();
      } else {
        alert("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleReport = () => {
    // Action for Report
    console.log('Report action triggered');
  };

  return (
    <div className="relative">
      <button
        id="dropdownMenuIconHorizontalButton"
        onClick={toggleDropdown}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <BiDotsHorizontalRounded size={20} />
      </button>

      <div
        id="dropdownDotsHorizontal"
        className={`z-10 absolute right-0 mt-2 ${
          isDropdownOpen ? 'block' : 'hidden'
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul
          className="py-1 text-xs text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton"
        >
          <li>
            <button
              onClick={handleEdit}
              className="w-full text-left block py-1 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </button>
          </li>
          <li>
            <button
              onClick={handleRemove}
              className="w-full text-left block py-1 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Remove
            </button>
          </li>
          <li>
            <button
              onClick={handleReport}
              className="w-full text-left block py-1 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Report
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
    