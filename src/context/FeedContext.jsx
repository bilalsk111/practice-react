import { createContext, useContext, useEffect, useState, useRef } from "react";
import { fetchPhotos } from "../api/unsplash";

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("trending");

  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const pageRef = useRef(1);

  const loadPhotos = async (reset = false) => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetchPhotos({
        query,
        page: reset ? 1 : pageRef.current,
      });

      const results = res.data.results || [];

      setPhotos(prev => {
        if (reset) return results;

        // ✅ REMOVE DUPLICATES
        const map = new Map();
        prev.forEach(p => map.set(p.id, p));
        results.forEach(p => map.set(p.id, p));
        return Array.from(map.values());
      });

      pageRef.current += 1;
    } catch (err) {
      console.error(err);
      setError("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pageRef.current = 1;
    loadPhotos(true);
  }, [query]);

  return (
    <FeedContext.Provider
      value={{
        photos,
        loading,
        error,
        isTyping,
        setIsTyping,
        setQuery,
        loadMore: () => loadPhotos(false),
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => useContext(FeedContext);
