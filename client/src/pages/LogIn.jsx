import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FailModal from "../components/FailModal";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [failModal, setfailModal] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handlePageSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/login",
        {
          email,
          password,
        },
        { "Content-Type": "application/json" }
      );
      setEmail("");
      setPassword("");
      navigate(`/app/demo`);
    } catch (error) {
      setfailModal(true);
      setMessage(error.response.data.message);
      setTimeout(() => {
        setfailModal(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-full max-w-sm p-5 flex flex-col gap-10">
          <h2 className="text-4xl flex justify-center font-bold text-primary-purple">
            Log In
          </h2>
          <form action="POST" className="flex flex-col gap-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-300 p-2 rounded-md"
              placeholder="Type your email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-300 p-2 rounded-md"
              placeholder="Password"
            />
            <div className="flex items-start mb-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-purple"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-primary-purple font-bold hover:underline"
                >
                  terms and conditions
                </a>
              </label>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handlePageSubmit}
                className="bg-primary-violet text-white p-2 rounded-md"
              >
                LOGIN
              </button>
            </div>
            <div className="flex text-sm justify-center">
              <p className="text-text-light-grey">
                Don't have account?{" "}
                <Link
                  to={"/app/signup"}
                  className="text-primary-purple font-bold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
          <div className="text-[12px] text-text-light-grey text-center">
            <p>
              By signing up, you agree that we collect your name and email
              address in order to allow you access to your account, manage your
              account, and contact you about changes to your account.
            </p>
          </div>
        </div>
      </div>
      <FailModal visibility={failModal} text={message} />
    </>
  );
};

export default LogIn;
