import React from 'react'
import { useEffect, useRef } from "react";

const SenderMessage = ({ image, message }) => {
  const scroll = useRef(null);
  
  useEffect(() => {
    scroll?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message, image]);
  
  return (
    <div className="w-full flex justify-end px-4 py-1.5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="max-w-[70%] relative" ref={scroll}>
        {/* Message Bubble */}
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white rounded-2xl rounded-br-md p-3 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow duration-200">
          {/* Image Preview */}
          {image && (
            <div className="relative mb-2 rounded-xl overflow-hidden">
              <img
                src={image}
                alt="Sent"
                className="w-52 h-52 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
              {/* Checkmark overlay for sent images */}
              <div className="absolute bottom-2 right-2 bg-black/30 backdrop-blur-sm rounded-full p-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Message Text */}
          {message && (
            <p className="text-sm font-medium leading-relaxed break-words text-white/95">
              {message}
            </p>
          )}
        </div>
        
        {/* Message Tail */}
        <div className="absolute -bottom-0.5 right-2 w-3 h-3 bg-indigo-500 border-r border-b border-indigo-400/30 transform rotate-45"></div>
        
        {/* Read/Seen Status */}
        <div className="absolute -bottom-5 right-1 flex items-center gap-1">
          <svg className="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] text-slate-400 font-medium">Sent</span>
        </div>
      </div>
    </div>
  );
}

export default SenderMessage;