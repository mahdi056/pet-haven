import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const DonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/donation-campaign")
      .then((res) => {
        // Sort by createdAt in descending order
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCampaigns(sorted);
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">All Donation Campaigns</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-white shadow-md rounded-md p-4 flex flex-col"
          >
            <img
              src={campaign.petImage}
              alt="Pet"
              className="h-48 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              {campaign.petName || "Untitled Pet"}
            </h3>
            <p><strong>Max Donation:</strong> ${campaign.maxAmount}</p>
            <p><strong>Donated Amount:</strong> ${campaign.donatedAmount || 0}</p>
            <Link
              to={`/donation-details/${campaign._id}`}
              className="btn btn-sm btn-warning w-full mt-6"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationCampaigns;
