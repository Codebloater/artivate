import React, { useState } from "react";

const Card = ({ cardImg, cardTitle, cardColor }) => {
  return (
    <>
      <div className=" flex flex-col gap-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
        <div className="flex justify-center">
          <div className={cardColor}>
            <img src={cardImg} className="w-8 h-8" alt="uploads" />
          </div>
        </div>
        <h2 className="text-lg text-primary-purple text-center font-semibold font-sans">
          {cardTitle}
        </h2>
      </div>
    </>
  );
};

export default Card;
