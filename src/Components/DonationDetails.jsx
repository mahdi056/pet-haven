import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { AuthContext } from "./Provider/AuthProvider";

const DonationDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios.get(`http://localhost:5000/donation-campaign/${id}`)
      .then(res => setCampaign(res.data))
      .catch(err => console.error("Error fetching campaign details:", err));
  }, [id]);

  useEffect(() => {
    if (donationAmount > 0) {
      axios.post('http://localhost:5000/create-payment-intent', {
        amount: donationAmount * 100, 
        currency: "bdt"
      })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(err => console.error("Payment intent error:", err));
    }
  }, [donationAmount]);

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
console.log(today);

if (today > deadline) {
 Swal.fire(
  "The donation deadline has passed.",
   "You can no longer donate.",
  "warning"
 )
  return; 
}



  if (!stripe || !elements) return;

  const card = elements.getElement(CardElement);
  if (!card) return;

  const { paymentMethod, error: methodError } = await stripe.createPaymentMethod({
    type: 'card',
    card
  });

  if (methodError) {
    console.error(methodError);
    Swal.fire("Error", methodError.message, "error");
    return;
  }

  const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod.id,
  });

  if (confirmError) {
    console.error(confirmError);
    Swal.fire("Error", confirmError.message, "error");
    return;
  }

  if (paymentIntent.status === 'succeeded') {
    const donationData = {
      campaignId: campaign._id,
      amount: donationAmount,
      donorEmail: user.email,
      petImage: campaign.petImage,
      petName: campaign.petName,
      date: new Date(),
    };

    await axios.post('http://localhost:5000/donations', donationData);

    Swal.fire("Success", "Donation successful!", "success");
    setIsModalOpen(false);
    setDonationAmount("");
  }
};


  if (!campaign) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <img
        src={campaign.petImage}
        alt="Pet"
        className="w-full h-64 object-contain rounded-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{campaign.petName}</h2>
      <p><strong>Max Donation Amount:</strong> ৳{campaign.maxAmount}</p>
      <p><strong>Donated Amount:</strong> ৳{campaign.donatedAmount || 0}</p>
      <p><strong>Donation Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
      <p className="mt-4"><strong>Description:</strong></p>
      <p>{campaign.description}</p>
      <p className="mt-4 text-sm text-gray-500">Created At: {new Date(campaign.createdAt).toLocaleString()}</p>

      {
        user ? (<button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 btn btn-warning btn-outline text-black px-4 py-2 rounded"
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

              <div className="mb-4 mt-2">
                <CardElement options={{ hidePostalCode: true }} />
              </div>

              <button
                type="submit"
                disabled={!stripe || !clientSecret}
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
