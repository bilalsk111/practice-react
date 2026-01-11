import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/UselocalStorage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage("users", []);

  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now() }]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const clearUsers = () => {
    setUsers([]);
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, clearUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
