import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const AllDonations = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:5000/donationcampaigns");
      setCampaigns(res.data);
    } catch (error) {
      toast.error("Failed to fetch campaigns");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This campaign will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/donationcampaigns/${id}`);
      toast.success("Campaign deleted");
      fetchCampaigns();
    } catch (error) {
      toast.error("Failed to delete campaign");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Paused" : "Active";
    try {
      await axios.patch(`http://localhost:5000/donationcampaigns/${id}`, {
        status: newStatus,
      });
      toast.success(`Campaign ${newStatus.toLowerCase()} successfully`);
      fetchCampaigns();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`http://localhost:5000/donationcampaigns/${editingCampaign._id}`, {
        title: editingCampaign.title,
        description: editingCampaign.description,
        petImage: editingCampaign.petImage,
        maxAmount: editingCampaign.maxAmount,
        petName: editingCampaign.petName,
        deadline: editingCampaign.deadline,
        userEmail: editingCampaign.userEmail,
        donatedAmount: editingCampaign.donatedAmount,
      });
      toast.success("Campaign updated");
      setEditingCampaign(null);
      fetchCampaigns();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4">
      <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-bold mb-4">All Donation Campaigns</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Pet Image</th>
              <th>Max Amount</th>
              <th>Deadline</th>
              <th>User Email</th>
              <th>Created At</th>
              <th>Donated Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, index) => (
              <tr key={c._id}>
                <td>{index + 1}</td>
                <td>{c.petName}</td>
                <td>
                  <img
                    src={c.petImage}
                    alt={c.petName}
                    className="w-16 h-16 rounded"
                  />
                </td>
                <td>{c.maxAmount}</td>
                <td>{new Date(c.deadline).toLocaleDateString()}</td>
                <td>{c.userEmail}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>{c.donatedAmount}</td>
                <td>{c.status || "Active"}</td>
                <td className="space-x-2 space-y-2">
                  <button
                    onClick={() => handleToggleStatus(c._id, c.status)}
                    className="btn btn-sm btn-info w-12"
                  >
                    {c.status === "Paused" ? "Resume" : "Pause"}
                  </button>
                  <button
                    onClick={() => setEditingCampaign(c)}
                    className="btn btn-sm btn-warning w-12"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-sm btn-error w-12"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
    {editingCampaign && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
    <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6">
      
      {/* Close button */}
      <button
        onClick={() => setEditingCampaign(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Modal Header */}
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Campaign</h3>

      {/* Modal Form Content */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Pet Name</label>
          <input
            type="text"
            value={editingCampaign.petName}
            onChange={(e) =>
              setEditingCampaign({ ...editingCampaign, petName: e.target.value })
            }
            placeholder="Pet Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Maximum Amount</label>
          <input
            type="number"
            value={editingCampaign.maxAmount}
            onChange={(e) =>
              setEditingCampaign({ ...editingCampaign, maxAmount: e.target.value })
            }
            placeholder="Max Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            value={editingCampaign.deadline}
            onChange={(e) =>
              setEditingCampaign({ ...editingCampaign, deadline: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Owner Email</label>
          <input
            type="email"
            value={editingCampaign.userEmail}
            disabled
            className="w-full px-4 py-2 bg-gray-100 text-gray-500 border border-gray-300 rounded-md cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Donated Amount</label>
          <input
            type="number"
            value={editingCampaign.donatedAmount}
            onChange={(e) =>
              setEditingCampaign({ ...editingCampaign, donatedAmount: e.target.value })
            }
            placeholder="Donated Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Modal Footer */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setEditingCampaign(null)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AllDonations;
