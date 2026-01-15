const SkeletonCard = () => {
  return (
    <div className="break-inside-avoid rounded-2xl bg-zinc-800 animate-pulse">
      <div className="w-full h-[240px] bg-zinc-700 rounded-t-2xl" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-3/4 bg-zinc-700 rounded" />
        <div className="h-3 w-1/2 bg-zinc-700 rounded" />
      </div>
    </div>
  );
};

export default SkeletonCard;

