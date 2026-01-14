import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        alert("Login Successful!");
        navigate("/"); // Redirect to Home
        window.location.reload(); // Optional: Reload to update Navbar state
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-18 rounded-3xl backdrop-blur-xs shadow-xl min-w-[350px]"
      >
        <h2 className="font-bold text-3xl text-center text-white">Login</h2>
        <input
          type="text"
          name="email"
          placeholder="Enter Your Email or Username"
          className="bg-white py-2 px-3 w-full rounded-xl outline-none"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength={6}
          className="bg-white py-2 px-3 w-full rounded-xl"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <Link
          to="/forgetpassword"
          className=" text-white underline hover:text-violet-500 text-sm"
        >
          Forget Password?
        </Link>
        <button
          type="submit"
          className="bg-blue-400 text-white font-medium py-2 rounded-xl hover:cursor-pointer hover:bg-blue-500 transition-colors"
        >
          Login
        </button>
        <span className=" text-white text-center">
          Not have an account?{" "}
          <Link
            to="/signup"
            className=" text-white underline hover:text-violet-500 font-bold"
          >
            Sign Up Here
          </Link>
        </span>
        <Link
          to="/"
          className="bg-gray-300 text-black py-2 rounded-xl text-center hover:bg-gray-400 transition-colors"
        >
          Back to Home
        </Link>
      </form>
    </div>
  );
}
