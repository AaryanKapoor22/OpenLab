import { React, useState } from "react";
import Joi from "joi-browser";

import auth from "../services/authService";

const LoginForm = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    errors: {},
  });

  // if (!auth.getCurrentUser()) window.location = "/";
  const validate = () => {
    const schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };
    const { error } = Joi.validate(state.data, schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    console.log(errors);
    return errors;
  };
  const validateProperty = ({ name, value }) => {
    let schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };
    const obj = { [name]: value };
    schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };
  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...state.errors } || {};
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    setState((preValue) => {
      // Get the previous value of state
      return {
        ...preValue, // use the spread operator to get all the previous values of state
        [input.name]: input.value,
        errors: errors,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /*const errors = validate();
    setState((preValue) => {
      // Get the previous value of state
      return {
        ...preValue, // use the spread operator to get all the previous values of state
        errors: errors || {},
      };
    });*/
    try {
      const { username, password } = state;
      auth.login(username, password);

      window.location = "/"; //state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...state.errors };
        errors.username = ex.response.data;
        setState((preValue) => {
          // Get the previous value of state
          return {
            ...preValue, // use the spread operator to get all the previous values of state
            errors: errors,
          };
        });
      }
    }
  };

  return (
    <div>
      <h1>Login </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            defaultValue={state.username}
            onChange={handleChange}
            id="username"
            aria-describedby="usernameHelp"
          />
          {state.errors.username && (
            <div className="alert alert-danger"> {state.errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            defaultValue={state.password}
            name="password"
            onChange={handleChange}
            type="password"
            className="form-control"
          />
          {state.errors.password && (
            <div className="alert alert-danger"> {state.errors.password}</div>
          )}
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
