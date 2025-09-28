import { Link, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {AuthContext} from "./Provider/AuthProvider";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PetDetails = () => {
  const {user} = useContext(AuthContext);
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/pet-list/${id}`)
      .then(res => setPet(res.data))
      .catch(err => console.error("Error fetching pet details:", err));
  }, [id]);




  const handleSubmit = (e) => {
    e.preventDefault();

    const adoptionData = {
      petName: pet.name,
      petImage: pet.image,
      petAge: pet.age,
      petCategory: pet.category,
      petLocation: pet.location,
      PetDescription: pet.description,
      adopterName: user.displayName,
      adopterEmail: user.email,
      ownerEmail: pet.userEmail,
      phone,
      address,
    };

    axios.post("http://localhost:5000/adopt", adoptionData)
      .then(() => {
        toast.success("Adoption request submitted!",{
          position: 'top-center',
          autoClose: 2000
        });
        setShowModal(false);
        setPhone("");
        setAddress("");
      })
      .catch((err) => console.error("Adoption submission failed:", err));
  };

  if (!pet) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer></ToastContainer>
      <h2 className="text-3xl font-bold text-center mb-6">{pet.name}</h2>
      <img
        src={pet.image}
        alt={pet.name}
        className="w-full h-96 rounded-lg mb-6"
      />
      <p className="mt-12"><strong>Age:</strong> {pet.age}</p>
      <p><strong>Category:</strong> {pet.category}</p>
      <p><strong>Location:</strong> {pet.location}</p>
      <p className="mt-2"><strong>Description:</strong> {pet.description}</p>

     <div className="flex items-center gap-x-2 mt-4">
      {
        user && user.emailVerified ? ( <button
        onClick={() => setShowModal(true)}
        className="btn btn-warning mt-4"
      >
        Adopt
      </button>)
      :
      ( <button
        
        className="btn btn-outline btn-warning mt-4"
      >
        <Link to='/login'>Adopt</Link>
      </button>)
     }


     <Link to='/petlist'><button className="btn btn-outline btn-error mt-4">Back</button></Link>
     </div>

      {/* Modal */}
     {showModal && (
  <div className="fixed inset-0 z-50 flex justify-center items-center">
    {/* Background overlay with opacity */}
    <div className="absolute inset-0 bg-black opacity-50"></div> 

    {/* Modal content */}
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-50">
      <h3 className="text-xl font-semibold mb-4">Adopt {pet.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <p className="text-sm text-center text-red-400 mb-4">Only Applicable for the Citizen of {pet.location}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-warning text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default PetDetails;
