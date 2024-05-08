// Name: Kevin, Matt, Aaryan, Camryn
// app set up for routes and corresponding components - from sample code
import React, { useState, useEffect } from "react";
import NavBar from "./components/navBar";
import { Route, Routes } from "react-router-dom";
import About from "./components/about";
import NotFound from "./components/notFound";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import Logout from "./components/logout";
import LabScheduling from "./components/labScheduling";
import LabManager from "./components/labManager";
import AbsenceTracker from "./components/absencetracking";
import Dashboard from "./components/professor_dashboard";
import ProtectedRoute from "./components/protectedRoute"; 
import UserContext from "./components/UserContext";

function App() {
  // get the user state
  const [user, setUser] = useState("");

  // get the current user
  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  // set up routes 
  return (
    <UserContext.Provider value={user}>
      <div className="container">
        <BrowserRouter>
          <NavBar user={user} />
          <Routes>
            <Route path="/login" element={<LoginForm onLogin={setUser} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" exact element={<RegisterForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/logout" element={<Logout />} />
            <ProtectedRoute path="/labs" element={<LabScheduling />} />
            <ProtectedRoute path="/absence" element={<AbsenceTracker />} />
            <Route path="/not-found" element={<NotFound />} />
            <ProtectedRoute path="/dashboard" element={<Dashboard />} />
            <ProtectedRoute path="/labManager" element={<LabManager />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
