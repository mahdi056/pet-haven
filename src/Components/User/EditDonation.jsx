import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const EditDonation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        axios.get(`https://pet-haven-server-mu.vercel.app/donation-campaigns/${id}`)
            .then(res => setCampaign(res.data))
            .catch(err => {
                console.error(err);
                Swal.fire("Error", "Failed to load donation campaign", "error");
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCampaign(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`https://pet-haven-server-mu.vercel.app/donation-campaigns/${id}`, {
                maxAmount: Number(campaign.maxAmount),
                paused: campaign.paused
            });

            Swal.fire("Success", "Donation campaign updated", "success");
            navigate("/dashboard/mydonationcampaigns"); 
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update campaign", "error");
        }
    };

    if (!campaign) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Edit Donation Campaign</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Pet Name</label>
                    <input
                        type="text"
                        value={campaign.petName}
                        disabled
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">User Email</label>
                    <input
                        type="text"
                        value={campaign.userEmail}
                        disabled
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Maximum Donation Amount</label>
                    <input
                        type="number"
                        name="maxAmount"
                        value={campaign.maxAmount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1 mb-2">Pause Campaign</label>
                    <button
                        type="button"
                        onClick={() =>
                            setCampaign(prev => ({ ...prev, paused: !prev.paused }))
                        }
                        className={`px-4 py-2 rounded text-white ${campaign.paused ? "bg-red-600" : "bg-green-600"
                            }`}
                    >
                        {campaign.paused ? "Paused" : "Running"}
                    </button>
                </div>

                <button type="submit" className="btn btn-warning text-white rounded">
                    Update Campaign
                </button>
            </form>
        </div>
    );
};

export default EditDonation;
