import { motion } from "framer-motion";

export default function CardFront({ onClick }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="w-[350px] h-[500px] bg-white rounded-lg shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border-2 border-[#e5e7eb] cursor-pointer overflow-hidden"
    >
      {/* Card Background */}
      <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#f0f9ff] to-[#ffedd5] relative">
        
        {/* Top Decorative Stripe */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#f59e0b] to-[#ef4444]" />
        
        {/* Main Content */}
        <div className="text-center space-y-6">
          {/* Main Heading */}
          <h1 className="text-5xl font-bold text-[#1f2937] leading-tight" 
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Happy<br/>
            Birthday<br/>
            <span className="text-[#d97706]">Daddy</span>
          </h1>
          
          {/* Divider */}
          <div className="w-20 h-1 bg-[#f59e0b] mx-auto rounded-full" />
          
          {/* Subtext */}
          <p className="text-[#4b5563] italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
            A special celebration
          </p>
        </div>

        {/* Corner Decoration */}
        <div className="absolute bottom-4 right-4 text-4xl">🎉</div>
      </div>
    </motion.div>
  );
}