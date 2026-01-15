import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useFeed } from "../context/FeedContext";
import { fetchSuggestions } from "../api/unsplash";
import { Link } from "react-router-dom";

const CATEGORIES = ["Nature", "AI", "Tech", "People", "Travel"];

const Navbar = () => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const { setQuery, setIsTyping } = useFeed();
  const debounced = useDebounce(text, 300);

  useEffect(() => {
    setQuery(debounced.trim() || "trending");
    setIsTyping(false);
  }, [debounced, setQuery, setIsTyping]);

  useEffect(() => {
    if (!debounced.trim()) return setSuggestions([]);
    fetchSuggestions(debounced)
      .then(res => setSuggestions(res.data.results || []))
      .catch(() => setSuggestions([]));
  }, [debounced]);

  const handleInputChange = (e) => {
    setText(e.target.value);
    setIsTyping(true);
  };

  const clearSearch = () => {
    setText("");
    setQuery("trending");
    setIsTyping(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-white/5">
      <div className="px-4 py-3 space-y-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-xl tracking-tight">
            Pix<span className="text-red-500">Hub</span>
          </h1>

          <div className="relative flex-1 max-w-xl mx-auto group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors" size={20} />
            <input
              value={text}
              onChange={handleInputChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder="Search visuals..."
              className="w-full h-11 pl-12 pr-10 rounded-full bg-zinc-900 border border-white/5 focus:border-white/20 focus:bg-zinc-800 transition-all outline-none"
            />
            {text && (
              <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition">
                <X size={16} className="text-white/60" />
              </button>
            )}

            {focused && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-zinc-900/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
                {suggestions.map(s => (
                  <button
                    key={s.id}
                    onMouseDown={() => { setText(s.title); setIsTyping(true); }}
                    className="block w-full px-4 py-3 text-left hover:bg-white/5 text-sm text-white/80 transition-colors"
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to='/saved'>Saved Page</Link>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mask-gradient">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setText(cat); setIsTyping(true); }}
              className="px-4 py-1.5 text-sm font-medium rounded-full bg-zinc-800/50 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
