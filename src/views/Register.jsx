import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Please login.");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed");
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
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-18 rounded-3xl backdrop-blur-xs shadow-xl min-w-[350px]"
      >
        <h2 className="font-bold text-3xl text-center text-white">Sign up</h2>
        <input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          className="bg-white py-2 px-3 w-full rounded-xl"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="bg-white py-2 px-3 w-full rounded-xl"
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="bg-white py-2 px-3 w-full rounded-xl"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-400 text-white font-medium py-2 rounded-xl hover:cursor-pointer hover:bg-blue-500 transition-colors"
        >
          Sign Up
        </button>
        <span className="text-white text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white underline hover:text-violet-500 font-bold"
          >
            Login
          </Link>
        </span>
        <hr className="border-white/20" />
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
