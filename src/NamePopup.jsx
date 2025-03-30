import React, { useState } from "react";

const NamePopup = ({ onSubmit }) => {
  const [name, setName] = useState("");
  //Δημιουργία συνάρτησης για να διαχειρίζεται την φόρμα του ονόματος
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-800 to-blue-600">
      <div className="bg-white p-6 sm:p-12 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8">Πως σε λένε;</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full mb-4 focus:ring focus:ring-blue-300"
            placeholder="Γράψε το όνομά σου..."
          />

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 "
            >
              Πάμε!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NamePopup;
