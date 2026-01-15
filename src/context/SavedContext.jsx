import { createContext, useContext, useEffect, useState } from "react";

const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [saved, setSaved] = useState([]);

  // load once
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("saved_photos")) || [];
    setSaved(data);
  }, []);

  const toggleSave = (photo) => {
    setSaved(prev => {
      const exists = prev.some(p => p.id === photo.id);
      const updated = exists
        ? prev.filter(p => p.id !== photo.id)
        : [...prev, photo];

      localStorage.setItem("saved_photos", JSON.stringify(updated));
      return updated;
    });
  };

  const clearSaved = () => {
    setSaved([]);
    localStorage.removeItem("saved_photos");
  };

  return (
    <SavedContext.Provider value={{ saved, toggleSave, clearSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
