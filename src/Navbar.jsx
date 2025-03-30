import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = ({ name, onLogout }) => {
  //Διαθέσιμη ωρα 30 λεπτά
  const [time, setTime] = useState(1800);
  const navigate = useNavigate();
  useEffect(() => {
    if (time === 0) return;

    const timer = setInterval(() => {
      setTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);
  //Έξοδος απο την εφαρμογή όταν τελειώνει ο διαθέσιμος χρόνος
  useEffect(() => {
    if (time === 0) {
      onLogout();
    }
  }, [time, onLogout]);
  //Με την μέθοδο αυτή εμφανίζουμε το διαθέσιμο χρόνο
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  //Μετάβαση αρχική σελίδα
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="w-full bg-gray-800 text-white p-4 flex flex-col items-center fixed top-0 left-0">
      <div className="flex justify-center space-x-8 mb-2">
        <button
          onClick={handleHome}
          className="bg-blue-500 px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-blue-600"
        >
          Αρχική
        </button>
        <button
          onClick={onLogout}
          className="bg-yellow-400 px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-yellow-500"
        >
          Έξοδος
        </button>
      </div>
      <div className="flex justify-center space-x-8 p-2 bg-gray-700 rounded-lg">
        <span className="text-lg font-semibold text-yellow-300 tracking-wide">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
