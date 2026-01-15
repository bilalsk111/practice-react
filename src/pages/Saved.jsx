import { useSaved } from "../context/SavedContext";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import { Trash2 } from 'lucide-react';

const Saved = () => {
  const { saved, clearSaved } = useSaved();
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6 min-h-screen bg-zinc-900 text-white">
      {/* Back Button + Clear All */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-zinc-700 hover:bg-zinc-600 text-white px-2 py-2 rounded-full font-extrabold shadow-sm transition"
        >
         <ArrowLeft size={18} />
        </button>

        {saved.length > 0 && (
          <button
            onClick={clearSaved}
            className="text-sm text-white flex items-end  gap-2"
          >
            Clear All  <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-4">
        {saved.length > 0 ? "Saved Collection" : "No saved images"}
      </h2>

      {/* Saved Images */}
      {saved.length > 0 ? (
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {saved.map((photo, index) => (
            <PostCard
              key={`${photo.id}-${index}`}
              photo={photo}
              onOpen={() => {}}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-white/60 mt-10">
          You haven't saved any images yet.
        </p>
      )}
    </div>
  );
};

export default Saved;
