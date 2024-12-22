import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { FaArrowRightFromBracket } from "react-icons/fa6";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  return (
    <div className='bg-blue-100 flex items-center justify-center h-[100vh] font-sans'>
      <div className='w-80 gap-2 p-4 bg-white rounded-lg shadow-md flex flex-col justify-center'>
        <h2 className='text-xl font-semibold text-center'>Register</h2>
        <p className='text-center text-sm text-gray-500'>Enter your information to create an account</p>

        <form action="" method="post" className='flex flex-col'>
          <div className='mb-4'>
            <label htmlFor="email" className='font-semibold text-sm'>Email</label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-2 border rounded"
            />
          </div>

          <div className='mb-4'>
            <label htmlFor="password" className='font-semibold text-sm'>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 border rounded"
            />
          </div>

          <button
            type="button"
            onClick={async () => {
              try {
                const response = await axios.post("http://localhost:3000/auth/register", {
                  email,
                  password,
                });
                setMessage('Registration successful!');
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch (error) {
                setMessage('Error signing up, please try again.');
                console.error("Error during signup:", error);
              }
            }}
            className='bg-blue-500 text-white font-semibold py-2 rounded-md'>
            Register
          </button>
        </form>

        {message && <p className='text-center text-red-500 mt-2'>{message}</p>}

        <p className='font-semibold text-xs text-center mt-4'>
          Already have an account? <a href="/login" className='underline'>Log In</a>
        </p>

        <div className='flex justify-center items-center mt-4'>
          <button className='bg-blue-500 font-semibold font-mono text-xs rounded-md py-1 px-2 flex gap-1 items-center'>
            Back to Home <FaArrowRightFromBracket />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
