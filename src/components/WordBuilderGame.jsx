import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Λίστα ερωτήσεων
const levelsData = [
  {
    question: "Ενικός αριθμός αρσενικού γένους",
    word: "δάσκαλ",
    correctEnding: "ος",
    options: ["ος", "ας", "ης"],
    hint: "Αυτός που διδάσκει στο σχολείο.",
  },
  {
    question: "Πληθυντικός αριθμός αρσενικού γένους",
    word: "δάσκαλ",
    correctEnding: "οι",
    options: ["οι", "ες", "α"],
    hint: "Όταν υπάρχουν πολλοί που διδάσκουν.",
  },
  {
    question: "Σωστός χρόνος του ρήματος 'αγαπώ' (παρατατικός)",
    word: "αγαπ",
    correctEnding: "ούσα",
    options: ["ώ", "ούσα", "ησα"],
    hint: "Δείχνει ότι η ενέργεια γινόταν στο παρελθόν για κάποιο διάστημα.",
  },
  {
    question: "Ενικός αριθμός ουδέτερου γένους",
    word: "παιχνίδ",
    correctEnding: "ι",
    options: ["ο", "ι", "ια"],
    hint: "Τα παιδιά το χρησιμοποιούν για διασκέδαση.",
  },
  {
    question: "Πληθυντικός αριθμός ουδέτερου γένους",
    word: "παιχνίδ",
    correctEnding: "ια",
    options: ["ια", "ι", "ες"],
    hint: "Πολλά αντικείμενα για διασκέδαση.",
  },
  {
    question: "Σωστός χρόνος του ρήματος 'τρέχω' (αόριστος)",
    word: "έτρε",
    correctEnding: "ξα",
    options: ["ξα", "χες", "χε"],
    hint: "Η ενέργεια συνέβη μία φορά στο παρελθόν.",
  },
  {
    question: "Θηλυκό ουσιαστικό σε πληθυντικό αριθμό",
    word: "γυναίκ",
    correctEnding: "ες",
    options: ["ες", "α", "ων"],
    hint: "Αφορά πολλές γυναίκες μαζί.",
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
const WordBuilderGame = ({ name }) => {
  //Αρχικοποιήση τιμών
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedEnding, setSelectedEnding] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setLevels(shuffleArray([...levelsData]));
  }, []);
  ///Μέθοδος για την σωστή λειτουργία των λέξεων
  const verifyanswer = () => {
    if (selectedEnding === levels[currentLevel].correctEnding) {
      //Ελεγχος ερωτήσεων
      if (currentLevel < levels.length - 1) {
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
        setCurrentLevel((prev) => prev + 1);
      }, 1000);
    } else {
      setShowHint(true);
    }
  };
  //Μέθοδος για το πως θα ενεργήσει η εφαρμογή ανάλογα την επόμενη λέξη
  const nextword = () => {
    setLevels((prevLevels) => {
      //Χωρίζουμε τις λέξεις επομενες και παραβλεπομενες λέξεις
      const skippedQuestion = prevLevels[currentLevel];
      const newLevels = prevLevels.filter((_, index) => index !== currentLevel);
      return [...newLevels, skippedQuestion];
    });
    //Απενεργοποιούμε το hint για να μην πάει στην επόμενη ερώτηση και ενημερώνουμε την λίστα των λέξεων
    setShowHint(false);
    setCurrentLevel((prev) => (prev >= levels.length - 1 ? prev : prev));
  };
  //Μέθοδος handleGoToGames για να οδηγηθεί ο χρήστης μετά το τέλος του παιχνιδιού στα παιχνίδια
  const navigate = useNavigate();
  const handleGoToGames = () => {
    navigate("/games");
  };

  return (
    <div className="flex flex-col items-center bg-yellow-50 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        Κατασκευαστής Λέξεων
      </h2>
      {levels.length > 0 && currentLevel < levels.length ? (
        <>
          <p className="text-lg mb-3">{levels[currentLevel].question}</p>
          <p className="text-xl font-semibold text-yellow-500">
            {levels[currentLevel].word}___
          </p>
          {showHint && (
            <p className="text-gray-600 text-sm italic mb-2">
              💡 Υπόδειξη: {levels[currentLevel].hint}
            </p>
          )}
          <div className="flex space-x-4 mt-4">
            <select
              value={selectedEnding}
              onChange={(e) => setSelectedEnding(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-green-400"
            >
              {/* Εδώ γίνεται mapping των επιλογών */}
              <option value="">Επίλεξε</option>
              {levels[currentLevel].options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={verifyanswer}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-800 transition"
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
          <p>🎉 Μπράβο, {name}! Ολοκλήρωσες το παιχνίδι!</p>
          <button
            onClick={handleGoToGames}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Πήγαινε στα Παιχνίδια
          </button>
        </div>
      )}
    </div>
  );
};

export default WordBuilderGame;
