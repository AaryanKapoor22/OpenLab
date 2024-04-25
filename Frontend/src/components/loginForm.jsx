import React from "react";

import { useForm } from "react-hook-form";
import auth from "../services/authService";
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const { username, password } = data;
      auth.login(username, password);
      console.log(data);
      window.location = "/"; //state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setError("root", { message: ex.response.data });
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">User Name </label>
          <input
            {...register("username", {
              required: "User Name is required",
            })}
            type="text"
            name="username"
            className="form-control"
            id="useranme"
            aria-describedby="usernameHelp"
          />
        </div>
        {errors.username && (
          <div className="alert alert-danger"> {errors.username.message}</div>
        )}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be 6 chars",
              },
            })}
            id="password"
            name="password"
            type="password"
            className="form-control"
          />
        </div>
        {errors.password && (
          <div className="alert alert-danger"> {errors.password.message}</div>
        )}
        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Loading" : "Login"}
        </button>
        {errors.root && (
          <div className="alert alert-danger"> {errors.root.message}</div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
