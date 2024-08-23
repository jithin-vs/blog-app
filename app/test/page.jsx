"use client";

import BlogPage from "@/components/BlogSection/BlogPage";
import CommentSection from "@/components/Comments/CommentSection";
import NewPostcard from "@/components/NewPostcard/NewPostcard";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Link from "next/link";
import Dropdown from "@/components/DropDown/Dropdown";
import Image from "next/image";

const Page = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <Image src={"https://firebasestorage.googleapis.com/v0/b/blog-app-4f043.appspot.com/o/a50a0be3ce813d6b8f2f6b67f2c8386b.webp?alt=media&token=915746d7-1694-4116-b6b3-3c2137d13b92"}
      width={300}
      height={300
    }/>
  );
};

export default Page;
