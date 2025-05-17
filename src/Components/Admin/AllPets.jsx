import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";


const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    category: "",
    age: "",
    location: "",
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get("https://pet-haven-server-mu.vercel.app/petlist");
      setPets(res.data);
    } catch (error) {
      console.error("Failed to fetch pets", error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`https://pet-haven-server-mu.vercel.app/petlist/${id}`);
      toast.success("Pet deleted successfully");
      fetchPets();
    } catch (error) {
      toast.error("Failed to delete pet");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Adopted" ? "Not Adopted" : "Adopted";

    try {
      await axios.patch(`https://pet-haven-server-mu.vercel.app/petlist/${id}`, { adoptionStatus: newStatus });
      toast.success("Status updated");
      fetchPets();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const openUpdateModal = (pet) => {
    setSelectedPet(pet);
    setUpdateData({
      name: pet.name,
      category: pet.category,
      age: pet.age,
      location: pet.location,
    });
  };

  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.patch(`https://pet-haven-server-mu.vercel.app/petlist/${selectedPet._id}`, updateData);
      toast.success("Pet updated successfully");
      setSelectedPet(null);
      fetchPets();
    } catch (error) {
      toast.error("Failed to update pet");
    }
  };

  return (
    <div className="p-4">
      <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-bold mb-4">All Added Pets</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Added By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <tr key={pet._id}>
                <td>{index + 1}</td>
                <td>{pet.name}</td>
                <td>{pet.category}</td>
                <td>
                  <img src={pet.image} alt={pet.name} className="w-16 h-16 rounded" />
                </td>
                <td>{pet.userEmail}</td>
                <td>{pet.adoptionStatus || "Not Adopted"}</td>
                <td className="space-x-2 space-y-2 md:space-y-0">
                  <button
                    onClick={() => handleStatusToggle(pet._id, pet.adoptionStatus)}
                    className="btn btn-sm btn-info"
                  >
                    {pet.adoptionStatus === "Adopted" ? "Mark as Not Adopted" : "Mark as Adopted"}
                  </button>
                  <button
                    onClick={() => handleDelete(pet._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openUpdateModal(pet)}
                    className="btn btn-sm btn-warning"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  Modal */}
     {selectedPet && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
    {/* Modal container */}
    <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6">
      {/* Close button */}
      <button
        onClick={() => setSelectedPet(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Modal header */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Pet</h2>

      {/* Modal content */}
      <div className="space-y-4">
        <label>Pet Name</label>
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={updateData.name}
          onChange={handleUpdateChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={updateData.category}
          onChange={handleUpdateChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
         <label>Age</label>
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={updateData.age}
          onChange={handleUpdateChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
         <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={updateData.location}
          onChange={handleUpdateChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Modal footer */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setSelectedPet(null)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateSubmit}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AllPets;
