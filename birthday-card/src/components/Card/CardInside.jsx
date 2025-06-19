import { motion } from "framer-motion";
import NameBubble from "../NameBubble";

export default function CardInside({ names, onNameClick, onFlip }) {
  return (
    <div className="w-full h-full bg-white flex">
      {/* Left page */}
      <div className="w-1/2 h-full bg-gradient-to-br from-red-50 to-amber-50 p-6 flex flex-col">
        <h2 className="text-2xl font-serif text-amber-800 mb-4">
          To the World's Greatest Dad
        </h2>
        <div className="flex flex-wrap gap-3 mt-8">
          {names.map((person) => (
            <NameBubble
              key={person.id}
              name={person.name}
              onClick={() => onNameClick(person)}
            />
          ))}
        </div>
      </div>

      {/* Right page */}
      <div className="w-1/2 h-full bg-white p-6 relative">
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">
            Click a name to read their message
          </p>
        </div>
      </div>
    </div>
  );
}