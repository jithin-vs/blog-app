'use client'

import BlogPage from "@/components/BlogSection/BlogPage";
import CommentSection from "@/components/Comments/CommentSection";
import NewPostcard from "@/components/NewPostcard/NewPostcard";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Link from "next/link";
import Dropdown from "@/components/tester/test";

const page = () => {
  return (
    // <BlogPage></BlogPage>
    // <CommentSection></CommentSection>
    <div className="font-[sans-serif] relative">
      {/* <div className="h-[240px] font-[sans-serif]">
        <img src="https://readymadeui.com/cardImg.webp" alt="Banner Image" className="w-full h-full object-cover" />
      </div> */}

      <div className="m-4">
        <form className=" bg-opacity-70 bg-white shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-xl w-full mx-auto p-8 rounded-2xl">
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl font-bold text-center">
              Register
            </h3>
          </div>

          <div>
            <Dropdown></Dropdown>
            <label className="text-gray-800 text-xs block mb-2">
              Full Name
            </label>
            <div className="relative flex items-center">
              <input
                name="name"
                type="text"
                required
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none placeholder-slate-600"
                placeholder="Enter name"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                required
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none placeholder-slate-600"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none placeholder-slate-600"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="mt-8">
            <label className="text-gray-800 text-xs block mb-2">
              Re-Enter Password
            </label>
            <div className="relative flex items-center">
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none placeholder-slate-600"
                placeholder="Re-enter password"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all"
            >
              Register
            </button>
            <p className="text-gray-800 text-sm mt-8 text-center">
              Already have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
