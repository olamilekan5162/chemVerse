import { Atom, Hash, Ruler, Zap, Calendar, Info, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const ElementModal = ({ selectedElement, onModalClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-secondary dark:bg-primary relative w-full max-w-md rounded-xl border border-gray-200 p-6 shadow-xl backdrop-blur-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onModalClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          >
            <X />
          </button>

          <h2 className="text-primary dark:text-secondary mb-1 text-center text-3xl font-bold">
            {selectedElement.name}
          </h2>
          <p className="dark:text-secondary mb-4 text-center text-sm text-gray-600 italic">
            {selectedElement.groupBlock}
          </p>

          <div className="text-primary dark:text-secondary grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Atom size={18} /> <strong>Symbol:</strong>{" "}
              {selectedElement.symbol}
            </div>
            <div className="flex items-center gap-2">
              <Hash size={18} /> <strong>Atomic Number:</strong>{" "}
              {selectedElement.atomicNumber}
            </div>
            <div className="flex items-center gap-2">
              <Ruler size={18} /> <strong>Atomic Mass:</strong>{" "}
              {selectedElement.atomicMass}
            </div>
            <div className="flex items-center gap-2">
              <Zap size={18} /> <strong>Configuration:</strong>{" "}
              {selectedElement.electronicConfiguration}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} /> <strong>Discovered:</strong>{" "}
              {selectedElement.yearDiscovered}
            </div>
            <div className="flex items-center gap-2">
              <Info size={18} /> <strong>Standard State:</strong>{" "}
              {selectedElement.standardState}
            </div>
            <div className="flex gap-2 text-justify">
              <div className="flex gap-2">
                <Clock size={18} /> <strong>History:</strong>{" "}
              </div>
              {selectedElement.history}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ElementModal;
