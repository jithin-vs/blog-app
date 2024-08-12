import React from 'react'

const PostButton = ({children}) => {
  return (
    <button
    type="submit"
    className="flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
  >
    {children}
  </button>
  )
}

export default PostButton