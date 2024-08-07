'use client';

import React, { useState } from "react";
import InputField from "@/components/InputField/InputFileld.js";
import styles from "./login.module.css"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
    
const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const response = await signIn('credentials', {
        username,
        password,
        redirect: false, 
      });
      
      if (response?.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace('/');
    } catch (error) {
      console.log("An error occurred:", error);
      setError("An error occurred during login");
    }


  }
  return (
    <section className={styles.mainSection}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField label="Username" type="text" name="username" id="username" />
        <InputField label="Password" type="password" name="password" id="password" />
        <span className={styles.span}>
          <a href="#">Forgot password?</a>
        </span>
        <button className={styles.submit} type="submit" value="Log in" >Log In</button>
        <span className={styles.span}>
          Don't have an account? <Link href='/register'>Sign Up</Link>
        </span>
      </form>
    </section>
  );
};

export default Login;
