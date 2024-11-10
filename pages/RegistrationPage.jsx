import { useState } from "react";
import { useRouter } from "next/router";

import { useRegister } from "../services/mutations";
import styles from "./RegistrationPage.module.css";

function RegistrationPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

 const router = useRouter();
  const { mutate } = useRegister();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const registerHandler = (event) => {
    event.preventDefault();

    const { username, password, confirmPassword } = form;

    if (!username || !password)
      return alert("User Name and Password is Necessary");
    if (password !== confirmPassword) return alert("Passwords Isn't The Same!");

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data.data.message);
          router.push("/LoginPage");
        },
        onError: (error) => console.log(error.response.data.message),
      }
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>فرم ثبت نام</h1>
      <form className={styles.registrationform} onSubmit={registerHandler}>
        <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          className={styles.inputfield}
          value={form.username}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          className={styles.inputfield}
          value={form.password}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="تکرار رمز عبور"
          className={styles.inputfield}
          value={form.confirmPassword}
          onChange={changeHandler}
        />
        <button type="submit" className={styles.submitbutton}>
          ثبت نام
        </button>
      </form>
      <p className={styles.loginprompt}>حساب کاربری دارید؟</p>
    </div>
    // <form onSubmit={registerHandler}>
    //   <input
    //     type="text"
    //     name="username"
    //     placeholder="username"
    //     value={form.username}
    //     onChange={changeHandler}
    //   />
    //   <input
    //     type="password"
    //     name="password"
    //     placeholder="password"
    //     value={form.password}
    //     onChange={changeHandler}
    //   />
    //   <input
    //     type="password"
    //     name="confirmPassword"
    //     placeholder="confirm password"
    //     value={form.confirmPassword}
    //     onChange={changeHandler}
    //   />
    //   <button type="submit">Register</button>
    // </form>
  );
}

export default RegistrationPage;
