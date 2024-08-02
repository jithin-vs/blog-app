import React from "react";
import InputField from "@/components/InputField/InputFileld.js";
import styles from "./register.module.css";

const Register = () => {
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/api/auth/register')
  }
  return (
    <section className={styles.mainSection}>
      <h2>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField label="Name" type="text" name="name" id="name" />
        <InputField label="Email" type="email" name="email" id="email" />
        <InputField
          label="Password"
          type="password"
          name="password"
          id="password"
        />
        <InputField
          label="Re-Enter Password"
          type="password"
          name="password"
          id="password"
        />
        <span className={styles.span}>
          <a href="#">Forgot password?</a>
        </span>
        <input className={styles.submit} type="submit" value="Log in" />
        <span className={styles.span}>
          Don't have an account? <a href="#">Sign up</a>
        </span>
      </form>
    </section>
  );
};

export default Register;
