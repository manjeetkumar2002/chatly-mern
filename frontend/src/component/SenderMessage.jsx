import React from 'react'
import { useEffect ,useRef } from "react";
const SenderMessage = ({image,message}) => {
    const scroll = useRef(null);
    useEffect(() => {
  scroll?.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [message, image]);
  return (
    <div className="w-full flex justify-end px-3 my-2">
      <div className="max-w-[70%] bg-blue-500 text-white rounded-xl rounded-br-none p-3 shadow-md" ref={scroll}>
        {image && (
          <img
            src={image}
            alt="Sent"
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
}

export default SenderMessage