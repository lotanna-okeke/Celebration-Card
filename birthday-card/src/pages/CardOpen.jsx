import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NameBubble from "../components/NameBubble";

const NAMES_PER_PAGE = 8;
const MESSAGE_DISPLAY_TIME = 5000;

// Responsive grid positions (different for mobile/desktop)
const GRID_POSITIONS = {
  desktop: [
    { top: "0%", left: "5%" },
    { top: "25%", left: "0%" },
    { top: "50%", left: "10%" },
    { top: "75%", left: "15%" },
    { top: "15%", left: "50%" },
    { top: "40%", left: "75%" },
    { top: "60%", left: "55%" },
    { top: "85%", left: "55%" },
  ],
  mobile: [
    { top: "5%", left: "15%" },
    { top: "28%", left: "5%" },
    { top: "40%", left: "35%" },
    { top: "55%", left: "10%" },
    { top: "80%", left: "20%" },
    { top: "15%", left: "70%" },
    { top: "40%", left: "80%" },
    { top: "65%", left: "60%" },
  ],
};

const names = [
  { id: 1, name: "Aunty Ego", message: "You're the best dad ever!" },
  { id: 2, name: "Michael", message: "Thanks for all the life lessons." },
  { id: 3, name: "Emily", message: "Happy Birthday Dad!" },
  { id: 4, name: "David", message: "Wishing you the best year!" },
  { id: 5, name: "Jessica", message: "You're the best mom ever!" },
  { id: 6, name: "Daniel", message: "Thanks for being a friend." },
  { id: 7, name: "Jessica", message: "Happy Birthday Mom!" },
  { id: 8, name: "Daniel", message: "Wishing you the best year!" },
  { id: 9, name: "Jessica", message: "You're the best mom ever!" },
  { id: 10, name: "Daniel", message: "Thanks for being a friend." },
  { id: 11, name: "Jessica", message: "Happy Birthday Mom!" },
  { id: 12, name: "Daniel", message: "Wishing you the best year!" },
  { id: 1, name: "Sarah", message: "You're the best dad ever!" },
  { id: 2, name: "Michael", message: "Thanks for all the life lessons." },
  { id: 3, name: "Emily", message: "Happy Birthday Dad!" },
  { id: 4, name: "David", message: "Wishing you the best year!" },
  { id: 5, name: "Jessica", message: "You're the best mom ever!" },
  { id: 6, name: "Daniel", message: "Thanks for being a friend." },
  { id: 7, name: "Jessica", message: "Happy Birthday Mom!" },
  { id: 8, name: "Daniel", message: "Wishing you the best year!" },
  { id: 9, name: "Jessica", message: "You're the best mom ever!" },
];

export default function CardOpen() {
  const [selectedName, setSelectedName] = useState(null);
  const [showFinalPage, setShowFinalPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalPages = Math.ceil(names.length / NAMES_PER_PAGE);
  const currentNames = names.slice(
    currentPage * NAMES_PER_PAGE,
    (currentPage + 1) * NAMES_PER_PAGE
  );

  // Auto-close message after timeout
  useEffect(() => {
    if (!selectedName) return;

    const timer = setTimeout(() => {
      setSelectedName(null);
    }, MESSAGE_DISPLAY_TIME);

    return () => clearTimeout(timer);
  }, [selectedName]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedName(null);
    } else {
      setShowFinalPage(true);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedName(null);
    }
  };

  const handleBackFromFinal = () => {
    setShowFinalPage(false);
    setCurrentPage(totalPages - 1);
  };

  // Get positions based on screen size
  const getPositions = () => {
    const positions = isMobile ? GRID_POSITIONS.mobile : GRID_POSITIONS.desktop;
    return currentNames.map(
      (_, index) =>
        positions[index % positions.length] || { top: "20%", left: "20%" }
    );
  };

  return (
    <div className="fixed inset-0 bg-[#f5f5f5] flex items-center justify-center p-2 sm:p-4">
      {!showFinalPage ? (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[700px] h-[90vh] max-h-[500px] bg-white shadow-xl flex flex-col md:flex-row"
        >
          {/* Left Page */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-b from-blue-50 to-amber-50 p-4 md:p-8 relative md:border-r border-amber-200">
            {/* Decorations */}
            <div className="absolute top-2 left-2 md:top-4 md:left-4 text-xl md:text-3xl text-amber-400">
              ✨
            </div>
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-lg md:text-2xl text-amber-300">
              🎂
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-serif text-amber-800 mb-4 md:mb-8">
              To The World's Best Dad
            </h2>

            {/* Names Container */}
            <div className="relative h-[calc(100%-3rem)] md:h-[calc(100%-4rem)] mt-2 md:mt-4">
              {currentNames.map((person, index) => {
                const position = getPositions()[index];
                return (
                  <NameBubble
                    key={`${person.id}-${currentPage}`}
                    name={person.name}
                    isMobile={isMobile}
                    style={{
                      top: position.top,
                      left: position.left,
                      rotate: Math.random() * 10 - 5,
                    }}
                    onClick={() => setSelectedName(person)}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Page */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white p-4 md:p-8 relative">
            {/* Decorations */}
            <div className="absolute top-2 right-2 md:top-4 md:right-4 text-xl md:text-3xl text-red-300">
              ❤️
            </div>
            <div className="absolute bottom-2 right-2 md:bottom-20 md:right-4 text-xl md:text-3xl text-amber-400">
              🎉
            </div>
            <div className="absolute top-10 left-10 md:top-20 md:left-20 text-2xl md:text-4xl text-amber-400">
              🎊
            </div>
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-3xl md:text-5xl text-amber-400">
              🥂
            </div>
            <div className="absolute top-1/2 right-1/4 text-2xl md:text-4xl text-amber-200">
              ★
            </div>

            {/* Message Display */}
            <div className="h-full flex items-center justify-center">
              {selectedName ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-40 h-40 md:w-64 md:h-64 bg-yellow-50 p-4 md:p-6 shadow-md border border-amber-200 flex items-center justify-center relative"
                >
                  <button
                    onClick={() => setSelectedName(null)}
                    className="absolute top-1 right-1 md:top-2 md:right-2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                  <div className="flex flex-col">
                    <p className="text-sm md:text-base text-gray-800 font-serif text-center">
                      {selectedName.message}
                    </p>
                    <p className="text-sm md:text-base text-gray-600 font-serif italic mt-4 self-end">
                      — {selectedName.name}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <p className="text-sm md:text-base text-gray-500 italic">
                  Click a name to read messages
                </p>
              )}
            </div>
          </div>

          {/* Navigation Buttons - Fixed at bottom center on mobile */}
          <div
            className={`absolute ${
              isMobile
                ? "bottom-1 left-1/2 transform -translate-x-1/2"
                : "bottom-6 right-6"
            } flex gap-2 md:gap-4`}
          >
            {currentPage > 0 && (
              <button
                onClick={handlePrevPage}
                className="bg-amber-500 text-white px-3 py-1 md:px-5 md:py-2 rounded-full shadow-md hover:bg-amber-600 transition text-sm md:text-base"
              >
                ← {isMobile ? "Prev" : "Previous"}
              </button>
            )}
            <button
              onClick={handleNextPage}
              className="bg-amber-500 text-white px-3 py-1 md:px-5 md:py-2 rounded-full shadow-md hover:bg-amber-600 transition text-sm md:text-base"
            >
              {currentPage < totalPages - 1
                ? isMobile
                  ? "Next →"
                  : "Next Page →"
                : isMobile
                ? "Final →"
                : "Final Page"}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          className="relative w-full max-w-[700px] h-[90vh] max-h-[500px] bg-white shadow-xl flex flex-col md:flex-row"
        >
          {/* Final Page Left Side */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-b from-blue-50 to-amber-50 p-4 md:p-8 flex flex-col justify-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-amber-800 mb-4 md:mb-6">
              We Love You Daddy!
            </h2>
            <p className="text-xl md:text-2xl text-amber-600">Happy Birthday</p>
            <p className="text-lg md:text-xl text-gray-700 mt-2 md:mt-4">
              - From Your Children -
            </p>
          </div>

          {/* Final Page Right Side */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-b from-red-50 to-amber-100 p-4 md:p-8 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl lg:text-8xl">
              🎂
            </div>
            <div className="absolute top-4 right-4 md:top-8 md:right-8 text-2xl md:text-4xl">
              🎈
            </div>
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-2xl md:text-4xl">
              🎁
            </div>
          </div>

          {/* Back Button - Fixed position based on screen size */}
          <button
            onClick={handleBackFromFinal}
            className={`absolute ${
              isMobile
                ? "bottom-1 left-1/2 transform -translate-x-1/2"
                : "bottom-6 left-6"
            } bg-amber-500 text-white px-3 py-1 md:px-5 md:py-2 rounded-full shadow-md hover:bg-amber-600 transition text-sm md:text-base`}
          >
            ← Back
          </button>
        </motion.div>
      )}
    </div>
  );
}
