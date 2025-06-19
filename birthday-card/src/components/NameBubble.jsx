import { motion } from "framer-motion";

export default function NameBubble({ name, onClick, style, isMobile }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        y: isMobile ? [-1, 1, -1] : [-3, 3, -3] // Smaller bounce on mobile
      }}
      transition={{ 
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        type: "spring"
      }}
      whileHover={{ scale: 1.1 }}
      className={`absolute ${isMobile ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5 md:text-base md:px-4 md:py-2'} bg-amber-500 text-white rounded-full shadow-md cursor-pointer z-10`}
      style={style}
      onClick={onClick}
    >
      {name}
    </motion.div>
  );
}