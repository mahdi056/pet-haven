import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider'; // adjust path as needed

const MyDonations = () => {
  const { user } = useContext(AuthContext); // assuming user.email is available
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/donations?email=${user.email}`)
        .then(res => setDonations(res.data))
        .catch(err => console.error('Error fetching donations:', err));
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation, index) => (
            <div key={index} className="bg-white shadow-md rounded p-4">
              <img
                src={donation.petImage}
                alt={donation.petName}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{donation.petName}</h3>
              <p className="text-gray-700">Donated Amount: ${donation.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
