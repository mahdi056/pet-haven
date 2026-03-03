import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MngDonations = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/donation-campaign-admin"
      );
      setCampaigns(res.data);
    } catch (error) {
      toast.error("Failed to load campaigns");
    }
  };

  const handleApprove = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/donation-campaign-admin/${id}`,
        { approve: status }
      );

      toast.success(`Campaign ${status}`);
      fetchCampaigns();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <ToastContainer />

      <h2 className="text-3xl font-bold mb-6 text-orange-500">
        Manage Donation Campaigns
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="card bg-base-100 shadow-lg">
            <figure className="h-52">
              <img
                src={campaign.petImage}
                alt={campaign.petName}
                className="object-cover w-full h-full"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {campaign.petName}
              </h2>

              <p>Max Amount: {campaign.maxAmount} BDT</p>
              <p>
                Deadline:{" "}
                {new Date(campaign.deadline).toLocaleDateString()}
              </p>
              <p className="font-semibold">
                Status: {campaign.approve}
              </p>

              <div className="card-actions justify-end mt-4">
                <button
                disabled={campaign.approve == "Accepted"}
                  onClick={() =>
                    handleApprove(campaign._id, "Accepted")
                  }
                  className="btn bg-orange-400 text-white border-none hover:bg-orange-600"
                >
                  Accept
                </button>

                <button
                disabled={campaign.approve == "Rejected"}
                  onClick={() =>
                    handleApprove(campaign._id, "Rejected")
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

export default MngDonations;