import { useEffect, useRef, useState } from "react";
import { useFeed } from "../context/FeedContext";
import PostCard from "./PostCard";
import SkeletonCard from "./SkeletonCard";
import ImageModal from "./ImageModal";

const Feed = () => {
  const { photos, loadMore, loading, isTyping, error } = useFeed();
  const [selected, setSelected] = useState(null);
  const observerRef = useRef(null);
  const observerInstance = useRef(null);

  useEffect(() => {
    if (loading || isTyping) return;

    observerInstance.current = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { rootMargin: "250px" }
    );

    if (observerRef.current) observerInstance.current.observe(observerRef.current);

    return () => observerInstance.current?.disconnect();
  }, [loading, isTyping, loadMore]);

  if (loading && photos.length === 0) {
    return (
      <div className="px-4 columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isTyping) return null;

  if (!loading && error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  if (!loading && photos.length === 0) {
    return (
      <div className="text-center mt-20 text-white/50">
        <p className="text-xl">Search not found</p>
        <p className="text-sm">Try something else</p>
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <div className="columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 space-y-4">
        {photos.map(photo => (
          <PostCard key={photo.id} photo={photo} onOpen={() => setSelected(photo)} />
        ))}
      </div>
      <div ref={observerRef} className="h-10" />
      {loading && <p className="text-center py-4 text-white/40">Loading more…</p>}
      <ImageModal photos={photos} photo={selected} onClose={setSelected} />
    </div>
  );
};

export default Feed;
