import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    //Δημιουργία δομής της αρχικής σελίδας
    <div className="flex flex-col items-center mb-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 mt-8">
        Καλώς ήρθες στην εφαρμόγη "Τεχνολογία των Λέξεων"📚
      </h1>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 mt-8">
        📝 Τι είναι η Τεχνολογία των Λέξεων;
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Οι λέξεις είναι σαν κομμάτια ενός παζλ! 🧩 Συνδυάζονται με κανόνες αλλά
        και λίγη δημιουργικότητα.
      </p>
      <p className="mt-4 text-lg text-gray-600">
        Μέσα από την Τεχνολογία των Λέξεων, θα εξερευνήσεις πώς σχηματίζονται οι
        λέξεις, πώς αλλάζουν μορφή και νόημα, και πώς μπορούμε να τις
        χρησιμοποιούμε σωστά!
      </p>
      <p className="mt-4 text-lg text-gray-600">
        Εξερεύνησε τις λέξεις, μάθε να τις χρησιμοποιείς παίζοντας με τη γλώσσα!
        📝✨
      </p>
      <Link to="/games">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Ξεκινάμε! 🚀
        </button>
      </Link>
    </div>
  );
};

export default Home;
