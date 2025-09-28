import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addpet = () => {
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [petData, setPetData] = useState({
    name: '',
    age: '',
    category: '',
    location: '',
    description: '',
    image: '',
    userEmail: user?.email,

  });


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const imgbbApiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      const imageUrl = res.data.data.url;
      setPetData({ ...petData, image: imageUrl });
      
    } catch (err) {
      console.error('Image upload failed', err);
     
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPet = {
      ...petData,
      addedAt: new Date().toISOString(),
      adopted: false
    };

    try {
      await axios.post('http://localhost:5000/pet-list', newPet);
      toast.success('Pet added successfully!', {
        position: 'top-center',
        autoClose: 2000
      });
      setPetData({
        name: '',
        age: '',
        category: '',
        location: '',
        description: '',
        image: '',
        userEmail: user?.email || ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add pet.');
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Add a Pet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Pet Name"
            value={petData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="age"
            placeholder="Pet Age"
            value={petData.age}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <select
            name="category"
            value={petData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Fish">Fish</option>
            <option value="Bird">Bird</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Pet Location"
            value={petData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={petData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>

          <button type="submit" className="btn btn-warning w-full">Add Pet</button>
        </form>
      </div>







    </div>
  );
};

export default Addpet;