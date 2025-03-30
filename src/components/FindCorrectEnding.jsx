import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Λίστα ερωτήσεων
const wordsData = [
  {
    root: "παιδ",
    correctEnding: "ί",
    options: ["ος", "ί", "α"],
    hint: "Μικρό και χαρούμενο, γεμάτο ενέργεια.",
  },
  {
    root: "άνθρωπ",
    correctEnding: "ος",
    options: ["ια", "η", "ος"],
    hint: "Είμαστε όλοι, ανεξαρτήτως φύλου.",
  },
  {
    root: "βιβλί",
    correctEnding: "ο",
    options: ["ος", "η", "ο"],
    hint: "Το βρίσκεις στη βιβλιοθήκη.",
  },
  {
    root: "δάσκαλ",
    correctEnding: "ος",
    options: ["ος", "ας", "ης"],
    hint: "Διδάσκει στους μαθητές καθημερινά.",
  },
  {
    root: "αγορ",
    correctEnding: "ά",
    options: ["ά", "ες", "η"],
    hint: "Πηγαίνεις εκεί για να βρεις προϊόντα και υπηρεσίες.",
  },
  {
    root: "παιχνίδ",
    correctEnding: "ι",
    options: ["α", "ι", "η"],
    hint: "Κάτι διασκεδαστικό για τα παιδιά.",
  },
  {
    root: "καθηγητ",
    correctEnding: "ής",
    options: ["ής", "η", "ες"],
    hint: "Διδάσκει σε μεγαλύτερες τάξεις.",
  },
];
//Τυχαιότητα ερωτήσεων
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
//Έναρξη εφαρμογής
const FindCorrectEnding = ({ name }) => {
  //Αρχικοποιήση τιμών
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEnding, setSelectedEnding] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setWords(shuffleArray([...wordsData]));
  }, []);
  ///Μέθοδος για την σωστή λειτουργία των λέξεων
  const verifyanswer = () => {
    if (selectedEnding === words[currentIndex].correctEnding) {
      //Ελεγχος ερωτήσεων
      if (currentIndex < words.length - 1) {
        setFeedback("✅ Σωστά! Προχωράς στην επόμενη λέξη.");
      } else {
        //Τελευταία λέξη
        setFeedback("");
      }
      //Σε λάθος απάντηση εμφάνιση hint
      setShowHint(false);
      setTimeout(() => {
        setFeedback("");
        setSelectedEnding("");
        setCurrentIndex((prev) => prev + 1);
      }, 1000);
    } else {
      setShowHint(true);
    }
  };
  //Μέθοδος για το πως θα ενεργήσει η εφαρμογή ανάλογα την επόμενη λέξη
  const nextword = () => {
    setWords((prevWords) => {
      //Χωρίζουμε τις λέξεις επομενες και παραβλεπομενες λέξεις
      const skippedWord = prevWords[currentIndex];
      const newWords = prevWords.filter((_, index) => index !== currentIndex);
      return [...newWords, skippedWord];
    });
    //Απενεργοποιούμε το hint για να μην πάει στην επόμενη ερώτηση και ενημερώνουμε την λίστα των λέξεων
    setShowHint(false);
    setCurrentIndex((prev) => (prev >= words.length - 1 ? prev : prev));
  };
  //Μέθοδος handleGoToGames για να οδηγηθεί ο χρήστης μετά το τέλος του παιχνιδιού στα παιχνίδια
  const navigate = useNavigate();
  const handleGoToGames = () => {
    navigate("/games");
  };

  return (
    <div className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">
        Βρες τη σωστή κατάληξη
      </h2>
      {words.length > 0 && currentIndex < words.length ? (
        <>
          <p className="text-lg mb-3">
            Συμπλήρωσε τη λέξη:
            <strong className="text-blue-900">
              {" "}
              {words[currentIndex].root}___{" "}
            </strong>
          </p>
          {showHint && (
            <p className="text-gray-600 text-sm italic mb-2">
              💡 Υπόδειξη: {words[currentIndex].hint}
            </p>
          )}
          <div className="flex space-x-4">
            <select
              value={selectedEnding}
              onChange={(e) => setSelectedEnding(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-400"
            >
              {/* Εδώ γίνεται mapping των επιλογών */}
              <option value="">Επίλεξε</option>
              {words[currentIndex].options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={verifyanswer}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Έλεγχος
            </button>
            <button
              onClick={nextword}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Παράλειψη
            </button>
          </div>
          <p className="mt-3 text-lg font-semibold">{feedback}</p>
        </>
      ) : (
        //Όταν τελειώσει το παιχνίδι επιβραβέυεται ο χρήστης
        <div className="mt-6 text-2xl text-green-600">
          🎉 Μπράβο, {name}! Ολοκλήρωσες το παιχνίδι!
          <button
            onClick={handleGoToGames}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Πήγαινε στα Παιχνίδια
          </button>
        </div>
      )}
    </div>
  );
};

export default FindCorrectEnding;
