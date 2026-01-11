const UserCard = ({ user, deletehandler }) => {
  return (
    <div className="border p-3 rounded-md w-40">
      <img
        src={user.img || "https://via.placeholder.com/150"}
        alt={user.firstname}
        className="w-full h-24 object-cover"
      />
      <h3>{user.firstname}</h3>
      <h3>{user.lastname}</h3>
      <p className="text-xs">{user.phone}</p>

      <button
        onClick={deletehandler}
        className="bg-red-600 text-white px-2 py-1 text-xs rounded mt-2"
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;
