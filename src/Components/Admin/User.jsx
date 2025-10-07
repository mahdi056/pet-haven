import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const User = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  // Make Admin handler
  const handleMakeAdmin = async (userId) => {
    try {
      const res = await axios.put(`http://localhost:5000/users/admin/${userId}`);
      if (res.data.modifiedCount > 0) {
        toast.success("User promoted to Admin!");
        setUsers(prev => prev.map(user => user._id === userId ? { ...user, role: 'admin' } : user));
      }
    } catch (err) {
      toast.error("Failed to promote user.");
      console.error(err);
    }
  };

  // Add handler
  const handleRemoveAdmin = async (userId) => {
    try {
      const res = await axios.put(`http://localhost:5000/users/remove-admin/${userId}`);
      if (res.data.modifiedCount > 0) {
        toast.info("User removed from Admin!");
        setUsers(prev => prev.map(user => user._id === userId ? { ...user, role: 'user' } : user));
      }
    } catch (err) {
      toast.error("Failed to remove admin role.");
      console.error(err);
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Registered Users</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Country</th> 
              <th>Role</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {
                    user.image ? (<img src={user?.image} alt="User" className="w-10 h-10 rounded-full" />)
                      :
                      (
                        <RxAvatar className="w-8 h-8"></RxAvatar>
                      )
                  }

                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.city}</td>
                <td>{user.country}</td>
                <td>{user.role || 'user'}</td>
                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="btn btn-sm btn-error"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Make Admin
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
