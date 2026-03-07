import axios from "axios";
import { useEffect, useState } from "react";


const DonationHistory = () => {

  const [donations, setDonations] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/donations-admin')
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setDonations(sorted);
      })
  }, [])
  return (
    <div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Donation History</h2>
        {donations.length === 0 ? (
          <p>No donations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div key={donation._id} className="bg-white shadow-md rounded p-4">
                <img
                  src={donation.petImage}
                  alt={donation.petName}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold mb-1">{donation.petName}</h3>
                <p className="text-gray-700">Donated Amount: {donation.amount}</p>
                <p className="text-gray-700 text-sm">Donor Name: {donation.name}</p>
                <p className="text-gray-700 text-sm">Donor Email: {donation.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default DonationHistory;