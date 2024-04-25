import React, { Component } from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  validate = () => {
    const { error } = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    // console.log(this.state.username + " " + this.state.password);
    try {
      const { username, password } = this.state.account;
      auth.login(username, password);

      //const { state } = this.props.location;
      //console.log(state);

      window.location = "/"; //state ? state.from.pathname : "/";
      console.log("window location changed");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1>Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={this.state.account.username}
              onChange={this.handleChange}
              id="username"
              aria-describedby="usernameHelp"
            />
            {this.state.errors.username && (
              <div className="alert alert-danger">
                {" "}
                {this.state.errors.username}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={this.state.account.password}
              name="password"
              onChange={this.handleChange}
              type="password"
              className="form-control"
            />
            {this.state.errors.password && (
              <div className="alert alert-danger">
                {" "}
                {this.state.errors.password}
              </div>
            )}
            <button disabled={this.validate()} className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
