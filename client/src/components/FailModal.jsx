import React from "react";

const FailModal = ({ visibility, text }) => {
  if (!visibility) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex justify-center py-20 pr-10  items-start">
        <div className="bg-white p-2 border-l-8 flex gap-5 items-center font-semibold border-x-red-600 rounded-md">
          {text}
        </div>
      </div>
    </>
  );
};

export default FailModal;
