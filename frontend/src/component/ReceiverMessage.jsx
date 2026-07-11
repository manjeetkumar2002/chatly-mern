import React from "react";
import { useEffect, useRef } from "react";

const ReceiverMessage = ({ image, message }) => {
  const scroll = useRef(null);
  
  useEffect(() => {
    scroll?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message, image]);
  
  return (
    <div className="w-full flex justify-start px-4 py-1.5 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="max-w-[70%] relative" ref={scroll}>
        {/* Message Bubble */}
        <div className="bg-white border border-indigo-100/30 text-slate-800 rounded-2xl rounded-bl-md p-3 shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-shadow duration-200">
          {/* Image Preview */}
          {image && (
            <div className="relative mb-2 rounded-xl overflow-hidden">
              <img
                src={image}
                alt="Received"
                className="w-52 h-52 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-xl"></div>
            </div>
          )}
          
          {/* Message Text */}
          {message && (
            <p className="text-sm font-medium leading-relaxed break-words text-slate-700">
              {message}
            </p>
          )}
        </div>
        
        {/* Sender Avatar Indicator */}
        <div className="absolute -bottom-1 -left-3 w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
        </div>
        
        {/* Message Tail */}
        <div className="absolute -bottom-0.5 left-2 w-3 h-3 bg-white border-l border-b border-indigo-100/30 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default ReceiverMessage;