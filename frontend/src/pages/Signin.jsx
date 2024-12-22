import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../servises/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      login(response.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="bg-blue-100 flex items-center justify-center h-[100vh] font-sans">
      <div className="w-80 gap-2 p-4 bg-white rounded-lg shadow-md flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-center">Log In</h2>
        <p className="text-center text-sm text-gray-500">
          Enter your credentials to access your account
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col"
        >
          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded-md"
          >
            Log In
          </button>
        </form>

        <p className="font-semibold text-xs text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="underline">
            Register
          </a>
        </p>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 font-semibold font-mono text-xs rounded-md py-1 px-2 flex gap-1 items-center"
          >
            Back to Home <FaArrowRightFromBracket />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
