import { useState } from "react";
import UserCard from "./UserCard";
import { useUsers } from "../context/UserContext";


const UserForm = () => {
  const { users, addUser, deleteUser, clearUsers } = useUsers();

  const [user, setUser] = useState({
    img: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    if (Object.values(user).some(v => v.trim() === "")) {
      setError("All fields are required");
      return;
    }

    addUser(user);
    setUser({
      img: "",
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="p-4">
      <form
        onSubmit={submitHandler}
        className="max-w-64 flex flex-col gap-3 px-4 py-6 bg-zinc-800 rounded-md"
      >
        <h2>User Form</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input name="img" value={user.img} onChange={handleChange} placeholder="Image URL" />
        <input name="firstname" value={user.firstname} onChange={handleChange} placeholder="First Name" />
        <input name="lastname" value={user.lastname} onChange={handleChange} placeholder="Last Name" />
        <input name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" />
        <textarea name="address" value={user.address} onChange={handleChange} placeholder="Address" />

        <button className="border px-3 py-1" type="submit">
          Submit
        </button>
      </form>

      <button
        onClick={() => {
          if (window.confirm("Clear all users?")) clearUsers();
        }}
        className="bg-red-700 text-white px-3 py-1 mt-4"
      >
        Clear All
      </button>

      <div className="flex gap-4 mt-6 flex-wrap">
        {users.map(u => (
          <UserCard
            key={u.id}
            user={u}
            deletehandler={() => deleteUser(u.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserForm;
