import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const CreateDonationCampaign = () => {
     const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    petImage: null,
    maxAmount: '',
    deadline: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'petImage') {
      setFormData((prev) => ({ ...prev, petImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.petImage) {
      toast.error('Please upload an image.');
      return;
    }

    try {

      const imgForm = new FormData();
      imgForm.append('image', formData.petImage);
        const imgbbApiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY; 

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        imgForm
      );

      const imageUrl = imgbbRes.data.data.url;

   
      const campaignData = {
        petImage: imageUrl,
        maxAmount: parseFloat(formData.maxAmount),
        petName: formData.name,
        deadline: new Date(formData.deadline),
        description: formData.description,
        userEmail: user?.email,
        createdAt: new Date(),
      };

      const res = await axios.post('http://localhost:5000/donation-campaign', campaignData);

      if (res.data.insertedId) {
        toast.success('Donation campaign created', {
          position: 'top-center',
          autoClose: 2000,
        });
        setFormData({
          petImage: null,
          maxAmount: '',
          deadline: '',
          description: '',
          petName: '',
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to create campaign.');
    }
  };

    return (
        <div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-md">
        <ToastContainer></ToastContainer>
      <div>
        <label>Pet Image (Upload)</label>
        <input
          type="file"
          name="petImage"
          accept="image/*"
          onChange={handleChange}
          required
          className="file-input file-input-bordered w-full"
        />
      </div>

       <div>
        <label>Pet Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label>Maximum Donation Amount</label>
        <input
          type="number"
          name="maxAmount"
          value={formData.maxAmount}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

     

      <div>
        <label>Last Date of Donation</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="textarea textarea-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-warning w-full">
        Submit Campaign
      </button>
    </form>
            
        </div>
    );
};

export default CreateDonationCampaign;