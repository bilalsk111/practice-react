import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark } from "lucide-react";
import { toggleLike, isLiked } from "../utils/storage";
import { useSaved } from "../context/SavedContext";
import Toast from "./Toast";

const PostCard = ({ photo, onOpen }) => {
  const { saved, toggleSave } = useSaved();

  const [liked, setLiked] = useState(() => isLiked(photo.id));
  const [toast, setToast] = useState("");

  const isSaved = saved.some(p => p.id === photo.id);

  const handleLike = (e) => {
    e.stopPropagation();
    toggleLike(photo.id);
    setLiked(v => !v);
  };

  const handleSave = (e) => {
    e.stopPropagation();

    toggleSave(photo); // ✅ CONTEXT updates state → rerender everywhere

    setToast(
      isSaved ? "Removed from saved" : "Saved to collection"
    );

    setTimeout(() => setToast(""), 1200);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={onOpen}
        className="group relative rounded-2xl overflow-hidden cursor-zoom-in break-inside-avoid bg-zinc-900"
      >
        <img
          src={photo.urls.small}
          alt={photo.alt_description || "Image"}
          loading="lazy"
          className="w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition">
          <div className="absolute top-3 right-3 flex gap-3">
            <button onClick={handleLike}>
              <Heart
                className={`w-5 h-5 ${
                  liked
                    ? "fill-red-500 text-red-500"
                    : "text-white"
                }`}
              />
            </button>

            <button onClick={handleSave}>
              <Bookmark
                className={`w-5 h-5 ${
                  isSaved
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-white"
                }`}
              />
            </button>
          </div>
        </div>

        {photo.alt_description && (
          <div className="p-3 text-sm text-white/70 line-clamp-2">
            {photo.alt_description}
          </div>
        )}
      </motion.div>

      <Toast show={!!toast} text={toast} />
    </>
  );
};

export default PostCard;
