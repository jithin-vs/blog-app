import React from "react";
import styles from "./home.module.css";
import BlogCard from "@/components/BlogCard/BlogCard";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <SideBar className="w-1/4" />
        <BlogCard className="flex-1" />
      </div>
    </div>
  );
};

export default Home;