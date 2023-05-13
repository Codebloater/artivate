import React from "react";
import Logo from "../assets/Logo.svg";

const Footer = () => {
  return (
    <>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 ">
          <div className="md:flex md:justify-between">
            <div className="mb-6 ">
              <a href="/" className="flex items-center">
                <img src={Logo} className="h-8 mr-3" alt="FlowBite Logo" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 ">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow Us
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://www.linkedin.com/company/arti-vate/"
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="/" className="hover:underline">
                Artivate
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
