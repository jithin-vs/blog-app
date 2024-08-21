'use client';

import React, { useState } from "react";
import axios from "axios";
import InputField from "@/components/InputField/InputFileld.js";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";


const Register = () => {
   
  const router = useRouter();
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      name:formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword :formData.get("confirmPassword")
    }
    
    if (!validateEmail(user.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post('/api/auth/register', user)
      console.log(response);
      if (response.status === 200) {
        const form = e.target;
        form.reset();
        router.push('/login');
      }
    } catch (error) {
      console.log("error:\n",error);
    }

  }

  return (
    <div className="font-[sans-serif] relative">
      {/* <div className="h-[240px] font-[sans-serif]">
        <img src="https://readymadeui.com/cardImg.webp" alt="Banner Image" className="w-full h-full object-cover" />
      </div> */}

      <div className="m-4">
        <form onSubmit={handleSubmit} className=" bg-opacity-70 bg-white shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-xl w-full mx-auto p-8 rounded-2xl">
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl font-extrabold text-center">
              Register
            </h3>
          </div>

          <div>
            {/* <label className="text-gray-800 text-xs block mb-2">Full Name</label> */}
            <div className="relative flex items-center">
              <input
                name="name"
                type="text"
                required
                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"                placeholder="Enter name"
              />
            </div>
          </div>

          <div className="mt-8">
            {/* <label className="text-gray-800 text-xs block mb-2">Email</label> */}
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                required
                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
 className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="mt-8">
            <div className="relative flex items-center">
              <input
                name="confirmPassword"
                type="password"
                required
 className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                placeholder="Re-enter password"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
                className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
            >
              Register
            </button>
            <p className="text-gray-800 text-sm mt-8 text-center">
              Already have an account?{" "}
              <Link
                href="/login"
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

export default Register;
