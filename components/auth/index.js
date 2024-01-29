import React from "react";
import { Form } from "reactstrap";
import styles from "./auth.module.css";

export default function DashBoard() {
  return <div className={`dashboard ${styles.dashboard}`}></div>;
}

export function Register() {
  return (
    <>
      <h2>Register</h2>
      <Form></Form>
    </>
  );
}
