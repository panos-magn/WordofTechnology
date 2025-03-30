import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";
import Games from "./components/Games";
import WordBuilderGame from "./components/WordBuilderGame";
import FindCorrectEnding from "./components/FindCorrectEnding";
import Navbar from "./Navbar";
import NamePopup from "./NamePopup";
import "./index.css";

const App = () => {
  const [name, setName] = useState("");
  return (
    //Κρατάμε το όνομα του χρήστη
    <Router>
      <AppContent name={name} setName={setName} />
    </Router>
  );
};

const AppContent = ({ name, setName }) => {
  const navigate = useNavigate();

  useEffect(() => {
    //Δημιουργούμε την συνθήκη ανακατεύθηνσης του χρήστη οταν γινεται reset το όνομα
    if (!name && window.location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [name, navigate]);
  //Μέθοδος εξόδου από την εφαρμογή
  const handleLogout = () => {
    setName("");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-normal mt-40  p-4">
      {/* Δημιουργία routing της εφαρμογής  */}
      {name ? (
        <>
          <Navbar name={name} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route
              path="/WordBuilderGame"
              element={<WordBuilderGame name={name} />}
            />
            <Route
              path="/FindCorrectEnding"
              element={<FindCorrectEnding name={name} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        //Εμφάνιση του NamePopup με τη χρήση όνοματος
        <NamePopup onSubmit={setName} />
      )}
    </div>
  );
};

export default App;
