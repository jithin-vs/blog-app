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

  const validateForm = (user) => {
    if (
			user.username.length === 0 &&
			user.password.length === 0
		) {
			setError('All Fields are required.');
    }
   return error.length !== 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      name:formData.get("name"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      confirmPassword :formData.get("confirmPassword")
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
    <section className={styles.mainSection}>
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField name="name" label="name" type="text"  id="name" />
        <InputField name="username" label="Username" type="text"  id="username" />
        <InputField name="email" label="Email" type="email"  id="email" />
        <InputField
          name="password"
          label="Password"
          type="password"
          id="password"
        />
        <InputField
          name="confirmPassword"
          label="Re-Enter Password"
          type="password"
          id="conirmPassword"
        />
        <span className={styles.span}>
          <a href="#">Forgot password?</a>
        </span>
        <input className={styles.submit} type="submit" value="Log in" />
        <span className={styles.span}>
          Already have an account?  <Link href = '/login'>Sign INn</Link>
        </span>
      </form>
    </section>
  );
};

export default Register;
