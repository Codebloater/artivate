import React, { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import FailModal from "../components/FailModal";

import { FaUserCircle } from "react-icons/fa";
import { GoFileSymlinkDirectory } from "react-icons/go";
import {
  BsLightningChargeFill,
  BsFillExclamationDiamondFill,
} from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";

const Demo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [failModal, setfailModal] = useState(false);
  const [failmessage, setFailMessage] = useState("");

  const handleOnCloseModal = () => {
    setModalVisible(false);
  };

  const handleFeedBackSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/feedback",
        {
          subject,
          message,
        },
        { "Content-Type": "application/json" }
      );
      setSubject("");
      setMessage("");
    } catch (error) {
      setfailModal(true);
      setFailMessage(error.response.data.message);
      setTimeout(() => {
        setfailModal(false);
      }, 2000);
    }
  };

  return (
    <>
      <div>
        <header className="w-full flex justify-between items-center bg-white px-10 py-4 ">
          <div className="flex items-center gap-5 text-sm">
            <p className="font-semibold text-primary-purple">Dashboard</p>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <FaUserCircle color="#0E0049" size={25} />
          </div>
        </header>
        <section className="p-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-primary-purple flex items-center gap-2 font-bold text-2xl">
              Demo 1.0{" "}
              <p className="text-sm font-bold py-1 px-2 bg-yellow-300 rounded-lg text-yellow-600">{`Updating Soon!`}</p>
            </h2>
            <button
              type="button"
              onClick={() => setModalVisible(true)}
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-10 py-2.5 text-center"
            >
              Try!
            </button>
          </div>
          <h2 className="text-primary-purple font-semibold">
            Welcome to Artivate Demo - Experience the Future of Decentralized
            Collaboration!
          </h2>
          <h2 className="text-primary-purple font-semibold">
            We are thrilled to introduce you to our first launched demo version
            of Artivate. This limited-time opportunity allows you to get a taste
            of the remarkable features and benefits of our decentralized file
            sharing platform.
          </h2>
          <div className="flex flex-col gap-6">
            <h2 className="text-primary-purple font-semibold">
              In this exclusive demo, you can:
            </h2>
            <h2 className="text-primary-purple flex items-center gap-3 font-semibold">
              <GoFileSymlinkDirectory color="#FCD53F" size={25} /> Upload and
              Share Files
            </h2>
            <h2 className="text-primary-purple flex items-center gap-3 font-semibold">
              <BsLightningChargeFill color="#FF822D" size={25} /> Witness
              Lightning-Fast Speeds
            </h2>
            <h2 className="text-primary-purple flex items-center gap-3 font-semibold">
              <AiOutlineGlobal color="#0074BA" size={25} /> Embrace Global
              Accessibility
            </h2>
          </div>
          <h2 className="text-text-light-grey text-sm font-normal">
            Please note that this demo version is a limited release, aimed at
            providing you with a glimpse into the potential of decentralized
            file sharing. While the demo offers a subset of features, it
            showcases the underlying technology and principles that drive
            Artivate.
          </h2>
          <h2 className="text-text-light-grey text-sm font-normal">
            We encourage you to make the most of this opportunity and discover
            the possibilities that decentralized file sharing holds. Join us in
            shaping the future of file sharing by providing feedback and
            insights as we work towards delivering the full version of Artivate.
          </h2>
        </section>
        <section className="px-10 flex flex-col gap-3">
          <BsFillExclamationDiamondFill color="#FF822D" size={25} />
          <p className="text-red-500">
            We would like to remind you to exercise caution when uploading files
            to the demo version. While we strive to provide a secure
            environment, please be aware that the demo is not an optimized
            version of our product, and certain security measures may not be
            fully implemented. <br /> To protect your sensitive information, we
            strongly advise against uploading any files containing personal,
            confidential, or sensitive data to the demo platform. This includes,
            but is not limited to, financial records, medical information,
            government-issued documents, and any content that may compromise
            your privacy or security.
          </p>
        </section>
        <section className="p-10 flex flex-col gap-8">
          <h2 className="text-primary-purple font-bold text-2xl">Feedback</h2>
          <form>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-violet peer"
                required
                maxLength={"60"}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-violet peer-focus:dark:text-primary-violet peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Subject
              </label>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-primary-purple "
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="4"
                maxLength={"400"}
                className="block p-2.5 w-full text-sm text-primary-violet bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-violet focus:border-primary-violet"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={handleFeedBackSubmit}
              className="text-white mt-10 bg-primary-violet font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </section>
        <Modal onClose={handleOnCloseModal} visible={modalVisible} />
        <FailModal visibility={failModal} text={failmessage} />
      </div>
    </>
  );
};

export default Demo;
