import { motion } from "framer-motion";

export default function MessageNote({ message, onClose }) {
  return (
    <motion.div
      initial={{ scale: 0, rotateX: 90, opacity: 0 }}
      animate={{ scale: 1, rotateX: 0, opacity: 1 }}
      exit={{ scale: 0, rotateX: -90, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20"
      onClick={onClose}
    >
      <motion.div 
        className="w-64 bg-white p-6 rounded-lg shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper Fold Corner */}
        <div className="absolute top-2 right-2 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-amber-100" />
        
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        
        <div className="border-l-4 border-amber-300 pl-4">
          <p className="text-gray-800 font-serif italic">{message}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}