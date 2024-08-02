import React from "react";
import InputField from "@/components/InputField/InputFileld.js";
import styles from "./login.module.css"
    
const Login = () => {
  return (
    <section className={styles.mainSection}>
      <h2>Login</h2>
      <form className={styles.form}>
        <InputField label="Email" type="email" name="email" id="email" />
        <InputField label="Password" type="password" name="password" id="password" />
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

export default Login;
