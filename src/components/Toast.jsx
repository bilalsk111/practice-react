import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ show, text }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2
                     bg-zinc-900 text-white px-5 py-2
                     rounded-full shadow-lg z-50"
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
