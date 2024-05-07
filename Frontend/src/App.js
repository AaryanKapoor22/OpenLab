import React, { useState, useEffect } from "react";
import Table from "./table";
import NavBar from "./components/navBar";
import { Route, Routes } from "react-router-dom";
import Products from "./components/products";
import About from "./components/about";
import NotFound from "./components/notFound";
import { BrowserRouter } from "react-router-dom";
import ProductDetails from "./components/productDetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import Logout from "./components/logout";
import LabScheduling from "./components/labScheduling";
import LabManager from "./components/labManager";
import AbsenceTracker from "./components/absencetracking";
import Dashboard from "./components/professor_dashboard";
import ProtectedRoute from "./components/protectedRoute"; // Import ProtectedRoute
import UserContext from "./components/UserContext";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="container">
        <BrowserRouter>
          <NavBar user={user} />
          <Routes>
            <Route path="/login" element={<LoginForm onLogin={setUser} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" exact element={<RegisterForm />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/logout" element={<Logout />} />
            <ProtectedRoute path="/labs" element={<LabScheduling />} />
            <ProtectedRoute path="/absence" element={<AbsenceTracker />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/products" element={<Products sortBy="name" />} />
            <ProtectedRoute path="/dashboard" element={<Dashboard />} />
            <ProtectedRoute path="/labManager" element={<LabManager />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
