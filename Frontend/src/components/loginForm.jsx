import React from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import auth from "../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;
      console.log('Logging in with:', username, password); // Log the username and password
  
      await auth.login(username, password);  // Ensure login is awaited
      const user = auth.getCurrentUser();   // Get user details, assumed to be implemented
  
      console.log('Logged in user:', user); // Log the logged in user
  
      // Print the user's role
      console.log(`User role: ${user ? user.role : 'No user logged in'}`);
  
      // Redirect based on user role
      if (user && user.role === 'student') {
        console.log('Redirecting to /labs'); // Log the redirection
        navigate('/labs');
      } else if (user && user.role === 'admin') {
        console.log('Redirecting to /dashboard'); // Log the redirection
        navigate('/dashboard');
      }
    } catch (ex) {
      console.log('Login error:', ex); // Log any login errors
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
            {...register("username", { required: "User Name is required" })}
            type="text"
            name="username"
            className="form-control"
            id="username"  // Fixed typo in id
            aria-describedby="usernameHelp"
          />
          {errors.username && <div className="alert alert-danger">{errors.username.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            id="password"
            name="password"
            type="password"
            className="form-control"
          />
          {errors.password && <div className="alert alert-danger">{errors.password.message}</div>}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Loading..." : "Login"}
        </button>
        {errors.root && <div className="alert alert-danger">{errors.root.message}</div>}
      </form>
    </div>
  );
};

export default LoginForm;