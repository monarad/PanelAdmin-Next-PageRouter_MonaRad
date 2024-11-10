import { useState } from "react";
import { useRouter } from "next/router";
import { useLogin } from "../services/mutations";
import { setCookie } from "../utils/cookie";
import styles from  "./LoginPage.module.css"

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

 const router = useRouter();
  const { mutate } = useLogin();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const loginHandler = (event) => {
    event.preventDefault();

    const { username, password } = form;

    if (!username || !password)
      return alert("User Name and Password is Necessary");

    mutate(form, {
      onSuccess: (data) => {
        console.log(data);
        setCookie("token", data?.token);
        router.push("/");
      },
      onError: (error) => console.log(error.response.data.message),
    });
  };
  const clickHandler=(event)=>{
        event.preventDefault();
    // navigate("/registration");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>فرم ورود</h1>
      <form className={styles.registrationform} onSubmit={loginHandler}>
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
        <button type="submit" className={styles.submitbutton}>
          ورود
        </button>
      </form>
      <p className={styles.loginprompt} onClick={clickHandler}>
        ایجاد حساب کاربری !
      </p>
    </div>
    // <form onSubmit={loginHandler}>
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
    //   <button type="submit">Login</button>
    // </form>
  );
}

export default LoginPage;
