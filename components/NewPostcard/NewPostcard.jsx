"use client";
import React,{useState} from "react";

const NewPostcard = () => {
  const [blogPost, setBlogPost] = useState({
    title: "",
    description: "",
    username: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBlogPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/addPost", blogPost);
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
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write your thoughts..."
            value={blogPost.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* bottom actions */}
        <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
              <button
                type="button"
                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                <span className="sr-only">Embed map</span>
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                </svg>
                <span className="sr-only">Add emoji</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
              <button
                type="button"
                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                  />
                </svg>
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
