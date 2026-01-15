import { Bookmark } from "lucide-react";
import { useSaved } from "../context/SavedContext";
import { Link } from "react-router-dom";

const SavedButton = () => {
  const { saved } = useSaved();

  return (
    <Link to="/saved" className="relative">
      <Bookmark />
      {saved.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
          {saved.length}
        </span>
      )}
    </Link>
  );
};

export default SavedButton;