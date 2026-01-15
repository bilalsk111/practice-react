const LIKE_KEY = "liked_photos";
const SAVE_KEY = "saved_photos";

/* ---------- HELPERS ---------- */
const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const set = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

/* ---------- LIKE ---------- */
export const isLiked = (id) =>
  get(LIKE_KEY).includes(id);

export const toggleLike = (id) => {
  const list = get(LIKE_KEY);
  const updated = list.includes(id)
    ? list.filter(i => i !== id)
    : [...list, id];

  set(LIKE_KEY, updated);
  return updated;
};

/* ---------- SAVE ---------- */
export const isSaved = (id) =>
  get(SAVE_KEY).some(p => p.id === id);

export const toggleSave = (photo) => {
  const list = get(SAVE_KEY);

  // 🔥 HARD GUARANTEE: NO DUPLICATES
  const filtered = list.filter(p => p.id !== photo.id);

  const updated = isSaved(photo.id)
    ? filtered
    : [...filtered, photo];

  set(SAVE_KEY, updated);
  return updated;
};
