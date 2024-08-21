import React from "react";
import styles from "./home.module.css";
import BlogCard from "@/components/BlogCard/BlogCard";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import NewPostcard from "@/components/NewPostcard/NewPostcard";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* <div className="flex flex-1">
        <SideBar className="w-1/4" /> */}
        <div className="flex flex-col flex-1 gap-4"> 
          <NewPostcard className="w-full" />
          <BlogCard className="flex-1" />
        </div>
      {/* </div> */}
    </div>
  );  
};

export default Home;