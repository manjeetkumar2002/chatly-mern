import React from "react";

const ReceiverMessage = ({ image, message }) => {
  return (
    <div className="w-full flex justify-start px-3 my-2">
      <div className="max-w-[70%] bg-gray-200 text-black rounded-xl rounded-bl-none p-3 shadow-md">
        {image && (
          <img
            src={image}
            alt="Received"
            className="w-52 h-52 object-cover rounded-xl mb-2"
          />
        )}

        {message && (
          <p className="text-base font-medium break-words">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReceiverMessage;