import React, { useState } from "react";
import axios from "axios";

import { BsUpload } from "react-icons/bs";

const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MDRjMDNmYS1hYjU3LTRkNjctYTFiOC1mZTkzOTZkMTAyMmEiLCJlbWFpbCI6ImhhcnNoMjdwcm9maWxlYml0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxMGY2MjQyM2Y2YzUwMTAyZjFkMCIsInNjb3BlZEtleVNlY3JldCI6IjRjZjhlYmZhOGJiYWZhODdlZGFlN2QwY2E5YmJmNzY0NmY5YzEzMjY1OTljYjFhM2E3OGNkZGE3N2IwNGU3ODQiLCJpYXQiOjE2ODM4NzEwMTF9.diMlJzt5i_Ale6Fnp-dyhm2sHktjhSdO20tvm5Qi6t4`;

const Modal = ({ visible, onClose }) => {
  const [upload, setUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [hash, setHash] = useState(null);
  const [pinsize, setPinsize] = useState(null);

  const handleFormSubmission = async () => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("file", selectedFile);

    // Setting Up File Name
    const metadata = JSON.stringify({
      name: fileName,
    });

    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });

    formData.append("pinataOptions", options);

    try {
      setUpload(true);
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      setHash(res.data.IpfsHash);
      setPinsize(res.data.PinSize);
      setUpload(false);
    } catch (error) {
      console.log(error);
      setUpload(false);
    }
  };

  const handleFormCloseSubmission = () => {
    event.preventDefault();

    setHash("");
    setPinsize("");
    setUpload(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white  shadow-xl flex flex-col gap-5 px-14 py-5 rounded-lg">
        <h2 className="text-primary-purple  flex justify-center font-bold text-2xl">
          Upload
        </h2>
        <div>
          <form className="flex flex-col items-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#E1E0E9] hover:bg-gray-100 "
            >
              <div className="flex flex-col items-center justify-center px-40 py-20">
                <BsUpload color="#A7A4A4" />
              </div>
              <input
                id="dropzone-file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                type="file"
                className="hidden"
              />
            </label>
            <div className="mt-8">
              <input
                type="text"
                className="p-3 bg-white w-full rounded-lg"
                placeholder="file Name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
            </div>
            <div className="flex mt-10 items-center justify-evenly w-full gap-5">
              <button
                onClick={handleFormSubmission}
                className="p-2 bg-primary-violet flex justify-center items-center w-full rounded-lg text-white"
              >
                {upload ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-3 mr-2 text-gray-200 animate-spin fill-primary-purple"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : null}{" "}
                Upload
              </button>
              <button
                onClick={handleFormCloseSubmission}
                className="p-2 bg-red-500 w-full hover:bg-red-600 rounded-lg text-white"
              >
                {hash ? "Close" : "Cancel"}
              </button>
            </div>
            <div className="mt-10 text-sm flex flex-col gap-5">
              <div>
                <h2 className="font-bold mb-2">
                  File Hash <a href="">URL</a>
                </h2>
                <p>{`https://gateway.pinata.cloud/ipfs/${hash}`}</p>
              </div>
              <div>
                <h2 className="font-bold mb-2"> Pin Size</h2>
                <p>{pinsize}</p>
              </div>
              <div className="w-full flex flex-col justify-center ">
                <h2 className="text-2xl flex justify-center  font-bold text-green-500">
                  {hash ? "Successfull" : null}
                </h2>
                <h2 className="text-base mt-5 text-text-light-grey flex justify-center font-semibold">
                  {hash ? "Share the Feedback!" : null}
                </h2>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
