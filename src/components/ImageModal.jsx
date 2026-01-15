import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const ImageModal = ({ photos = [], photo, onClose }) => {
  if (!photo) return null;

  const index = photos.findIndex(p => p.id === photo.id);
  const prev = photos[index - 1];
  const next = photos[index + 1];

  useEffect(() => {
    if (next) {
      const img = new Image();
      img.src = next.urls.full;
    }
  }, [next]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && next) onClose(next);
      if (e.key === "ArrowLeft" && prev) onClose(prev);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      >
        <button onClick={() => onClose(null)} className="absolute top-6 right-6 text-white">
          <X size={28} />
        </button>

        {prev && (
          <button onClick={() => onClose(prev)} className="absolute left-6 text-white">
            <ChevronLeft size={32} />
          </button>
        )}

        <motion.img
          key={photo.id}
          src={photo.urls.full}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-h-[85vh] max-w-[90vw] rounded-xl"
        />

        {next && (
          <button onClick={() => onClose(next)} className="absolute right-6 text-white">
            <ChevronRight size={32} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
