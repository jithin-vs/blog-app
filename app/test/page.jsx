"use client";

import BlogPage from "@/components/BlogSection/BlogPage";
import CommentSection from "@/components/Comments/CommentSection";
import NewPostcard from "@/components/NewPostcard/NewPostcard";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Link from "next/link";
import Dropdown from "@/components/DropDown/Dropdown";

const page = () => {
  return (
    <div className="w-full max-h-[50vh] overflow-auto bg-white shadow-md dark:bg-gray-800 flex items-center justify-center">
      {image && (
        <Image
          className="object-cover w-full h-64"
          src={image}
          alt="Article"
          width={500}
          height={300}
        />
      )}

      <div className="p-6">
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            Product
          </span>
          <Link
            href="/post"
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
            role="link"
          >
            I Built A Successful Blog In One Year
          </Link>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
            parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris
            egestas quam volutpat viverra. In pretium nec senectus erat. Et
            malesuada lobortis.
          </p>
        </div>

        <div className="mt-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a
                href="#"
                className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                role="link"
              >
                Jone Doe
              </a>
              <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">
                21 SEP 2015
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
