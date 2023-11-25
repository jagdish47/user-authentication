import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialUser = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/register", user);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      setError("Fill all the Data");
    }
  };

  const handleOnChange = (e) => {
    setError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-[887px] flex items-center justify-center bg-orange-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center uppercase">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              value={user.username}
              type="text"
              name="username"
              className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              value={user.email}
              type="email"
              name="email"
              className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              value={user.password}
              type="password"
              name="password"
              className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-orange-600 transition duration-300 font-semibold"
            >
              Register
            </button>
            <p className="text-sm">
              Already registered?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
