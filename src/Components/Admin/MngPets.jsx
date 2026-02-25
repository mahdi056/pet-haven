import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MngPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/petlist-admin");
      setPets(res.data);
    } catch (error) {
      toast.error("Failed to load pets");
    }
  };

  const handleStatusChange = async (id, approve) => {
    try {
      await axios.patch(`http://localhost:5000/petlist-admin/${id}`, {
        approve,
      });

      toast.success(`Pet ${approve}`);
      fetchPets();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <ToastContainer />

      <h2 className="text-3xl font-bold mb-6 text-orange-500">
        Manage Pets
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet._id} className="card bg-base-100 shadow-lg">
            <figure className="h-52">
              <img
                src={pet.image}
                alt={pet.name}
                className="object-cover w-full h-full"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{pet.name}</h2>
              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age}</p>
              <p className="font-semibold">Status: {pet.approve}</p>

              <div className="card-actions justify-end mt-4">
                <button
                disabled={pet.approve == "Accepted"}
                  onClick={() =>
                    handleStatusChange(pet._id, "Accepted")
                  }
                  className="btn bg-orange-400 text-white hover:bg-orange-600"
                >
                  Accept
                </button>

                <button
                disabled={pet.approve == "Rejected"}
                  onClick={() =>
                    handleStatusChange(pet._id, "Rejected")
                  }
                  className="btn bg-red-500 text-white border-none hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MngPets;