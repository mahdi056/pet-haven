// src/components/Payment.jsx
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called, amount:", amount);

   
    if (!user) {
      console.log("User not logged in, redirecting to /login");
      navigate("/login");
      return;
    }

    const numeric = Number(amount);
    if (!numeric || numeric <= 0) {
      console.warn("Invalid amount entered:", amount);
      alert("Please enter a valid donation amount greater than 0.");
      return;
    }

    setLoading(true);

    const payload = {
      amount: numeric,
      name: user.displayName || "Anonymous Donor",
      email: user.email || "donor@example.com",
      phone: "01707226784", 
    };

    console.log("Sending payment payload to backend:", payload);

    try {
      const res = await axios.post("http://localhost:5000/api/payment", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      });

      console.log("Backend /api/payment response:", res.data);

      if (res.data && res.data.url) {
        console.log("Redirecting user to payment gateway:", res.data.url);
        // Immediately redirect user to SSLCOMMERZ-hosted page (shows bKash option)
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Donate with bKash</h2>

        {user ? (
          <>
            <label className="block text-sm text-gray-600">Name</label>
            <input type="text" value={user.displayName || "Anonymous Donor"} readOnly className="w-full p-2 border rounded mb-3 bg-gray-50" />

            <label className="block text-sm text-gray-600">Email</label>
            <input type="email" value={user.email || "donor@example.com"} readOnly className="w-full p-2 border rounded mb-4 bg-gray-50" />
          </>
        ) : (
          <p className="mb-4 text-sm text-gray-600">You must be logged in to donate. You will be redirected to login.</p>
        )}

        <input
          type="number"
          placeholder="Enter amount (BDT)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
          min="1"
          step="1"
        />

        <button type="submit" disabled={loading} className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
          {loading ? "Starting payment..." : "Donate with bKash"}
        </button>
      </form>
    </div>
  );
};

export default Payment;
