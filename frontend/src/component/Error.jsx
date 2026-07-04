import React from "react";
import {setError} from "../store/authSlice.js"
import {useDispatch} from "react-redux"
const Error = ({ message }) => {
  const dispatch = useDispatch()
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-sm rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Request Failed
        </h2>

        <p className="text-gray-700 mb-6">
          {message || "Something went wrong. Please try again."}
        </p>

        <div className="flex justify-end">
          <button onClick={()=>dispatch(setError(false))}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;