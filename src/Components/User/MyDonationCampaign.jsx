import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyDonationCampaign = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedDonors, setSelectedDonors] = useState([]);
  const [showDonorModal, setShowDonorModal] = useState(false);
 
  useEffect(() => {
    axios.get(`http://localhost:5000/donation-campaigns?email=${user.email}`)
      .then(res => {
     
        setCampaigns(res.data)}
      )
      .catch(err => console.error(err));
  }, [user.email]);

  const handlePauseToggle = async (id, currentStatus) => {
    try {
      await axios.patch(`http://localhost:5000/donation-campaigns/${id}`, { paused: !currentStatus });
      setCampaigns(prev => prev.map(c => c._id === id ? { ...c, paused: !currentStatus } : c));
      Swal.fire("Success", `Campaign ${!currentStatus ? "paused" : "unpaused"}`, "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update pause status", "error");
    }
  };

  const handleViewDonors = async (campaignId) => {
    try {
      const res = await axios.get(`http://localhost:5000/donations/${campaignId}`);
      
      setSelectedDonors(res.data);
      setShowDonorModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Donation Campaigns</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border">Pet Name</th>
            <th className="py-2 px-4 border">Max Donation (৳)</th>
            <th className="py-2 px-4 border">Progress</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(c => (
            <tr key={c._id} className="border-t">
              <td className="py-2 px-4 border">{c.petName}</td>
              <td className="py-2 px-4 border">{c.maxAmount}</td>
              <td className="py-2 px-4 border">
                <progress
                  className="w-48 h-3"
                  value={c.donatedAmount || 0}
                  max={c.maxAmount}
                ></progress>
                <span className="ml-2 text-sm text-gray-600">
                  {(c.donatedAmount || 0)} / {c.maxAmount}
                </span>
              </td>
              <td className="py-2 px-4 border space-x-2">
                
                <Link to={`/dashboard/edit-donation/${c._id}`}>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
                </Link>
                <button
                  onClick={() => handleViewDonors(c._id)}
                  className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                >
                  View Donators
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDonorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4">Donators</h3>
            {selectedDonors.length === 0 ? (
              <p>No donations yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {selectedDonors.map((donor, idx) => (
                  <li key={idx} className="py-2">
                    <p><strong>Email:</strong> {donor.email}</p>
                    <p><strong>Amount:</strong> ৳{donor.amount}</p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowDonorModal(false)}
              className="mt-4 text-red-600 underline text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationCampaign;
