import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";

import Swal from "sweetalert2";
import { AuthContext } from "./Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const DonationDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [users, setUsers] = useState([]);
  const [creator, setCreator] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:5000/donation-campaign/${id}`)
      .then(res => setCampaign(res.data))
      .catch(err => console.error("Error fetching campaign details:", err));
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    if (campaign && users.length > 0) {
      const matchedUser = users.find(u => u.email === campaign.userEmail);
      setCreator(matchedUser || null);
    }
  }, [campaign, users]);



  const handleDonate = async (e) => {
    e.preventDefault();

    const max = Number(campaign.maxAmount);
    const current = Number(campaign.donatedAmount || 0);
    const newDonation = Number(donationAmount);






    if (current + newDonation > max) {
      Swal.fire(
        "Limit Exceeded",
        `You cannot donate more than the remaining amount (৳${max - current})`,
        "warning"
      );
      return;
    }

    const deadline = new Date(campaign.deadline);
    const today = new Date();


    if (today > deadline) {
      Swal.fire(
        "The donation deadline has passed.",
        "You can no longer donate.",
        "warning"
      )
      return;
    }


    const payload = {
      amount: newDonation,
      name: user.displayName || "Anonymous Donor",
      email: user.email || "donor@gmail.com",
      phone: "01707226784",
      campaignId: campaign._id,
      petImage: campaign.petImage,
      petName: campaign.petName
    }

    console.log(payload);

    try {
      const res = await axios.post("http://localhost:5000/api/payment", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      });

      console.log("Backend /api/payment response:", res.data);

      if (res.data && res.data.url) {
        console.log("Redirecting user to payment gateway:", res.data.url);


        window.location.href = res.data.url;
      } else {
        console.error("No gateway URL returned from backend.", res.data);
        alert("Payment could not be started. Check console for details.");
      }
    } catch (err) {
      console.error("Error calling /api/payment:", err.response?.data || err.message);
      alert("Failed to initiate payment. Check console for details.");
    } finally {
      setLoading(false);
    }




  };


  if (!campaign) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <ToastContainer></ToastContainer>
      <img
        src={campaign.petImage}
        alt="Pet"
        className="w-full h-64 object-contain rounded-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{campaign.petName}</h2>
      <p><strong>Max Donation Amount:</strong> {campaign.maxAmount}</p>
      <p><strong>Donated Amount:</strong> {campaign.donatedAmount || 0}</p>
      <p><strong>Donation Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
      <p className="mt-4"><strong>Description:</strong></p>
      <p>{campaign.description}</p>
      <p className="mt-4 text-sm text-gray-500">Created At: {new Date(campaign.createdAt).toLocaleString()}</p>

      {creator && (

        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Creator Information</h3>
          <p><strong>Name:</strong> {creator.name || "N/A"}</p>
          <p><strong>Email:</strong> {creator.email}</p>
          {creator.phone && <p><strong>Phone:</strong> {creator.phone}</p>}
          {creator.city && <p><strong>City:</strong> {creator.city}</p>}
          {creator.country && <p><strong>Country:</strong> {creator.country}</p>}
        </div>
      )}
      <div className="flex gap-x-4">

        <div> {
          user && user.emailVerified ? (<button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 btn btn-warning text-black px-4 py-2 rounded"
            disabled={campaign.status == 'Paused' || campaign.paused == true}
          >
            Donate Now
          </button>)
            :
            (<Link to='/login'><button

              className="mt-6 btn btn-warning btn-outline text-black px-4 py-2 rounded"
            >
              Donate Now
            </button></Link>)
        }
        </div>

        <div>
          <Link to='/donationcampaigns'><button className="btn btn-outline btn-error mt-6">Back</button></Link>
        </div>

      </div>



      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h3 className="text-lg font-semibold mb-4">Donate to {campaign.petName}</h3>

            <form onSubmit={handleDonate}>
              <label className="block mb-2">
                Donation Amount (৳)
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </label>

              {/* <div className="mb-4 mt-2">
                <CardElement options={{ hidePostalCode: true }} />
              </div> */}

              <button
                type="submit"

                className="btn btn-warning text-black px-4 py-2  w-full"
              >
                Confirm Donation
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-sm text-red-500 underline block text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;
