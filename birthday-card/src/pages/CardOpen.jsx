import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NameBubble from "../components/NameBubble";
import dadPhoto from "../assets/dad-photo.jpeg"; // Import your photo

const NAMES_PER_PAGE = 8;
const MESSAGE_DISPLAY_TIME = 20000;

// Responsive grid positions (different for mobile/desktop)
const GRID_POSITIONS = {
  desktop: [
    { top: "0%", left: "5%" },
    { top: "25%", left: "0%" },
    { top: "50%", left: "10%" },
    { top: "75%", left: "15%" },
    { top: "15%", left: "50%" },
    { top: "40%", left: "70%" },
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
  {
    id: 1,
    name: "Mom",
    message:
      "Happy Birthday to the best husband and father in the world! May your heart desires be fulfilled today and always,  Amen. 🙏🏽. I pray for long life in good health, prosperity, growing stronger and closer to God, Amen.",
  },
  { id: 12, name: "KK", message: "Happy Birthday Daddy (couldn't get her messages on time) 😢" },
  { id: 12, name: "KC", message: "Happy Birthday Daddy (couldn't get his messages on time) 😢" },
  { id: 5, name: "Chiboy", message: "Daddy Happy Birthday. We are all wishing you long life, prosperity and good health in many more years to come. We thank you for everything you've done for us and what you've made us achieve in our respective lives. We pray the Lord would continue to use you for his work and continue to shower you with abundant blessings all the days of your life..all your hearts desires and private intentions are already granted in Jesus name, Amenn!! Thank you for being the best dad and role model to all of us up until this very day and we are privileged to have you as our Dad. Happy Birthday once again Big Man🙌🙏💙" },
  { id: 20, name: "Kam Kam", message: "Dear Father, Happy 53rd Birthday.Thank you for being my rock, my guide, and jointly my greatest example of strength and love, alongside mummy. Your wisdom, kindness, and sacrifices never go unnoticed. I'm so blessed to call you my father. Wishing you joy, good health, and all the happiness in the world today and always. Love you deeply!" },
  { id: 3, name: "Lolo", message: "Happy Birthday Daddy. Thank you for being a role model and a great father. I pray we, your children, coontinue to make you proud as the lord blesses you with joy, fulfillment and all your heart desires. 🙏🏾💙" },
  { id: 2, name: "Chinaza", message: "*Happy birthday to the best dad life gave me🥰🥰🥰🥰🥰🥰...* _I don't say this enough, you are the best dad any child could ever have. May God continue to bless you, protect you and keep directing your steps. For the love you showed and kept showing us all, may the love of God never elude you 🙏🙏🙏. And may The LORD bless you and keep you; The LORD make His face shine upon you, And be gracious to you; The LORD lift up His countenance upon you, And give you peace. AMEN 🥂 ✨" },
  { id: 12, name: "Aunty Oluchi", message: "Happy Birthday to a wonderful Brother-in-law, a man of inestimable value, a Jesus Lover, the humblest man I have ever known and an in-law per excellence. Many more years to you Sir. Heaven and earth celebrates you on this day. Chyko, you are indeed a blessing to our family and humanity at large. Chukwu gozie gide, I pray that you would be blessed with many more years of greatness." },
  { id: 4, name: "Chiamaka", message: "Happy birthday to the man God blessed my family with. He gave us an Uncle but you became much more, you became a father and friend to my brothers and I. Thank you so much sir for your support and Kindness, thank you for always being someone I can come to with my issues and leave lighter. I pray that God continues to bless your good heart with your desires, I pray for many more fruitful years that you may be able to see how your hardwork paid off and reap it as well. I pray that you forever remain the Jolly fellow that you are. God bless you Uncle Chike." },
  { id: 6, name: "Tony", message: "Happy Birthday, Uncle! Wishing you a fantastic day filled with laughter, joy, and all the things you love most. On this special occasion, I want to express my heartfelt gratitude for your constant guidance, support, and the positive impact you've had in my life. Your wisdom, integrity, and kindness are truly admirable, and I feel fortunate to have you as my uncle. May this new year bring you good health, great memories, and endless blessings. May all your aspirations continue to flourish, and may each day bring you closer to your heart's desires." },
  { id: 7, name: "David", message: "Happy Birthday to the most amazing uncle in the world! 🤩 Thank you for always being there for me, for your love, guidance, and support. I'm always so grateful. Wishing you wonderful years ahead filled with joy, good health, and happiness." },
  { id: 11, name: "Aunty Ego", message: "Happy Birthday! I pray the lord continues to bless you and your family." },
  { id: 8, name: "Chidalu", message: "Happy birthday Sir Chike..God bless you and your family for all that you do.. UK and I are waiting for all of you 😂..Cheers sir" },
  { id: 9, name: "Osora", message: "Happy birthday Uncle! Thank you for being so supportive and kind! God bless you sir" },
  { id: 10, name: "Uche", message: "May God in His mercy grant you divine strength and flavor as you take care of your family. Happy birthday Uncle Chike!" },
];

export default function CardOpen() {
  const [selectedName, setSelectedName] = useState(null);
  const [showFinalPage, setShowFinalPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

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

  const handleNextPage = async () => {
    if (isFlipping) return;
    
    setDirection(1);
    setIsFlipping(true);
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for flip animation
    
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedName(null);
    } else {
      setShowFinalPage(true);
    }
    
    setIsFlipping(false);
  };

  const handlePrevPage = async () => {
    if (isFlipping) return;
    
    setDirection(-1);
    setIsFlipping(true);
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for flip animation
    
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedName(null);
    }
    
    setIsFlipping(false);
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
        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${currentPage}`}
            initial={{ rotateY: direction * 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: direction * -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
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

            {/* Right Page (messages) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white p-4 md:p-8 relative">
              {/* Decorations */}
              <div className="opacity-60 absolute top-10 left-10 md:top-20 md:left-20 text-2xl md:text-4xl text-amber-400 z-20">
                🎊
              </div>
              <div className="absolute top-2 right-2 md:top-4 md:right-4 text-xl md:text-3xl text-red-300 z-20">
                ❤️
              </div>
              <div className="opacity-50 absolute top-1/2 right-1/4 text-2xl md:text-4xl text-amber-200 z-20">
                ★
              </div>
              <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-3xl md:text-5xl text-amber-400 z-20">
                🥂
              </div>
              <div className="absolute bottom-2 right-2 md:bottom-20 md:right-8 text-xl md:text-3xl text-amber-400 z-20">
                🎉
              </div>

              {/* Message Display */}
              <div className="h-full flex items-center justify-center">
                {selectedName ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="w-full max-w-[90%] h-full max-h-[90%] bg-yellow-50 p-4 md:p-6 shadow-md border border-amber-200 flex flex-col relative z-10"
                  >
                    <button
                      onClick={() => setSelectedName(null)}
                      className="absolute top-1 right-1 md:top-2 md:right-2 text-gray-500 hover:text-gray-700 z-30"
                    >
                      ✕
                    </button>
                    <div className="flex-grow overflow-y-auto px-2">
                      <div className="min-h-full flex items-center justify-center">
                        <p className="text-sm md:text-base text-gray-800 font-serif text-center">
                          {selectedName.message}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 font-serif italic mt-2 self-end">
                      — {selectedName.name}
                    </p>
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
                  disabled={isFlipping}
                  className="bg-amber-500 text-white px-3 py-1 md:px-5 md:py-2 rounded-full shadow-md hover:bg-amber-600 transition text-sm md:text-base disabled:opacity-50"
                >
                  ← {isMobile ? "Prev" : "Previous"}
                </button>
              )}
              <button
                onClick={handleNextPage}
                disabled={isFlipping}
                className="bg-amber-500 text-white px-3 py-1 md:px-5 md:py-2 rounded-full shadow-md hover:bg-amber-600 transition text-sm md:text-base disabled:opacity-50"
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
        </AnimatePresence>
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
              - From Your Family -
            </p>
          </div>

          {/* Final Page Right Side with Photo */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-b from-red-50 to-amber-100 p-4 md:p-8 relative overflow-hidden">
            {/* Photo Frame */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-[80%] h-full max-h-[80%] sm:max-w-[60%] sm:max-h-[60%] md:max-w-[75%] md:max-h-[75%] rounded-lg overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={dadPhoto}
                  alt="Dad"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-amber-400" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-amber-400" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-amber-400" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-amber-400" />
              </div>
            </div>

            {/* Decorations around photo */}
            <div className="absolute top-2 right-2 text-2xl md:text-4xl text-amber-400 animate-bounce">
              🎈
            </div>
            <div className="absolute bottom-2 left-2 text-2xl md:text-4xl text-amber-500 animate-pulse">
              🎁
            </div>
            <div className="absolute top-2 left-2 text-2xl md:text-4xl text-red-400 animate-float">
              ❤️
            </div>
            <div className="absolute bottom-2 right-2 text-2xl md:text-4xl text-amber-600 animate-spin-slow">
              ✨
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