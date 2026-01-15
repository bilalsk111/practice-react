import { useSaved } from "../context/SavedContext";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const { saved, clearSaved } = useSaved();
   const navigate = useNavigate();

  if (saved.length === 0) {
    return <p className="text-center mt-20 text-white/60">No saved images</p>;
  }

  return (
    <div className="px-4">
      
      <div className="flex justify-between items-center mb-6 pt-5">
      <div className="flex items-center gap-3">
          <button onClick={()=> navigate('/')}>back</button>
        <h2 className="text-xl font-semibold">Saved Collection</h2>
      </div>
        <button
          onClick={clearSaved}
          className="text-sm text-red-400 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {saved.map((photo, index) => (
          <PostCard
            key={`${photo.id}-${index}`}
            photo={photo}
            onOpen={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Saved;
