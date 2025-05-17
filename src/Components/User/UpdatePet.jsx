import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdatePet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [petData, setPetData] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios.get(`https://pet-haven-server-mu.vercel.app/pet-list/${id}`)
      .then(res => setPetData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedPet = { ...petData };

  
    if (imageFile) {
      const base64Image = await toBase64(imageFile);
      updatedPet.image = base64Image;
    }

    try {
      await axios.patch(`https://pet-haven-server-mu.vercel.app/pet-list/${id}`, updatedPet);


      Swal.fire({
        title: 'Success!',
        text: 'Pet updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
    
        navigate('/dashboard/myaddedpets');
      });
    
    } 
    
    
    
    catch (err) {
      console.error(err);
    }
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  if (!petData) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        
      <h2 className="text-2xl font-bold mb-4">Update Pet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Pet Name</label>
          <input name="name" value={petData.name} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block mb-1">Age</label>
          <input name="age" value={petData.age} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <select name="category" value={petData.category} onChange={handleChange} className="select select-bordered w-full" required>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Fish">Fish</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Location</label>
          <input name="location" value={petData.location} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea name="description" value={petData.description} onChange={handleChange} className="textarea textarea-bordered w-full" required />
        </div>
        <div>
          <label className="block mb-1">Pet Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-warning w-full">Update Pet</button>
      </form>
    </div>
  );
};

export default UpdatePet;
