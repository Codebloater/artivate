import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import logo from "../assets/Logo.svg";
import Card from "../components/Card";
import Uploads from "../assets/Uploads.svg";
import Security from "../assets/Security.svg";
import Globe from "../assets/Globe.svg";
import Light from "../assets/Light.svg";
import Footer from "../components/Footer";
import data from "../constant/Constants";
import SuccessModal from "../components/SuccessModal";
import FailModal from "../components/FailModal";

const Home = () => {
  const [email, setEmail] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [failModal, setfailModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/subscribe",
        {
          email,
        },
        { "Content-Type": "application/json" }
      );
      setSuccessModal(true);
      setEmail("");
      setTimeout(() => {
        setSuccessModal(false);
      }, 5000);
    } catch (error) {
      setfailModal(true);
      setTimeout(() => {
        setfailModal(false);
      }, 5000);
    }
  };

  return (
    <>
      <div className="sticky top-0">
        <header className="w-full flex justify-between items-center bg-white px-10 py-4 ">
          <div className="flex items-center gap-5 text-sm">
            <Link to={"/"}>
              <img src={logo} className="w-32 object-contain" alt="logo" />
            </Link>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link to={"/app/login"}>
              <p>Login</p>
            </Link>
            <Link
              to={"/app/signup"}
              className=" bg-primary-purple text-white p-2 rounded-md"
            >
              <p>Get Started</p>
            </Link>
          </div>
        </header>
      </div>
      <div className="flex flex-col min-h-screen mb-16">
        <div className="min-h-screen w-full flex justify-center items-center">
          <section className="max-w-fit min-h-fit flex flex-col pl-2">
            <h2 className="text-5xl max-w-5xl text-primary-purple line-clamp-2 leading-[80px] font-extrabold text-center ">
              {data.homePage.bannerSection.banner_heading}
            </h2>
            <p className="p-2 text-text-light-grey mt-4 flex justify-center max-w-5xl line-clamp-2 text-center font-ptSans">
              {data.homePage.bannerSection.banner_desc}
            </p>
          </section>
        </div>
        {/* Features Section starts */}
        <div className="min-h-fit w-full flex flex-col justify-center items-center">
          <section className="max-w-fit min-h-fit">
            <p className="text-custom-green-dark text-[15px] font-bold mt-7 flex justify-center text-center font-sans">
              {data.homePage.featureSection.feature_title}
            </p>
            <h2 className="text-3xl mt-7 max-w-5xl text-primary-purple line-clamp-2 leading-[80px] font-extrabold text-center font-sans">
              {data.homePage.featureSection.feature_heading}
            </h2>
            <p className="p-2 text-text-light-grey mt-2 flex justify-center max-w-5xl line-clamp-2 text-center font-sans">
              {data.homePage.featureSection.feature_desc}
            </p>
          </section>
          <section className="flex flex-wrap w-full justify-evenly mt-16 gap-5">
            <Card
              cardImg={Uploads}
              cardColor={"bg-card-colors-lightblue p-8 rounded-3xl"}
              cardTitle={"Decentralized Uploads"}
            />
            <Card
              cardImg={Security}
              cardColor={"bg-card-colors-lightyellow p-8 rounded-3xl"}
              cardTitle={"Enhanced Security"}
            />
            <Card
              cardImg={Globe}
              cardColor={"bg-card-colors-lightorange p-8 rounded-3xl"}
              cardTitle={"Global Accessibility"}
            />
            <Card
              cardImg={Light}
              cardColor={"bg-card-colors-lightpink p-8 rounded-3xl"}
              cardTitle={"Lightning-fast Speed"}
            />
          </section>
        </div>
        {/* NewsLetter Section starts */}
        <div className="min-h-fit p-10 w-full flex flex-col justify-center items-center mt-16">
          <section className="max-w-[fit-content]">
            <h2 className="text-3xl  max-w-5xl text-primary-purple truncate leading-[80px] font-extrabold text-center font-sans">
              Newsletter
            </h2>
            <form action="POST" className="flex gap-4 ">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                placeholder="email"
                className="p-2 bg-gray-300 rounded-md"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="p-2 bg-primary-violet text-white font-semibold rounded-md"
              >
                Subscribe!
              </button>
            </form>
          </section>
        </div>
      </div>
      <SuccessModal visibility={successModal} text={"Subscribed!"} />
      <FailModal visibility={failModal} text={"Failed to Subscribe!"} />
      <Footer />
    </>
  );
};

export default Home;
