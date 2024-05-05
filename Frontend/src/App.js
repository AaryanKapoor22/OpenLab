import { useState, React, useEffect } from "react";
import Table from "./table";
import NavBar from "./components/navBar";
import { Route, Routes, Navigate } from "react-router-dom";
import Products from "./components/products";
import About from "./components/about";
import NotFound from "./components/notFound";
import { BrowserRouter } from "react-router-dom";
import ProductDetails from "./components/productDetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import Logout from "./components/logout";
import RecipeDetails from "./components/recipeDetails";
import Labs from "./components/labs";
import LabManager from "./components/labManager";
import AbsenceTracker from "./components/absencetracking";
import Dashboard from "./components/professor_dashboard"; 


function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = auth.getCurrentUser();
    console.log(user);
    setUser(user);
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" exact element={<Table />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/absence" element={<AbsenceTracker />} />
          <Route path="/manager" element={<LabManager />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/products" element={<Products sortBy="name" />} />
          <Route path="/redirect" element={<Navigate to="/" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
