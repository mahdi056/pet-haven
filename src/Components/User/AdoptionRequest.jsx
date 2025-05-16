import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const AdoptionRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/adopt?ownerEmail=${user.email}`)
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => console.error("Error fetching adoption requests:", err));
    }
  }, [user?.email]);

  const handleStatusChange = (id, newStatus) => {
    axios
      .patch(`http://localhost:5000/adopt/${id}`, { status: newStatus })
      .then(() => {
        toast.success(`Request ${newStatus} successfully`);
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
      })
      .catch((err) => {
        toast.error("Failed to update status");
        console.error(err);
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Adoption Requests</h2>
      {requests.length === 0 ? (
        <p>No adoption requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>#</th>
                <th>Pet Name</th>
                <th>Pet Image</th>
                <th>Adopter Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr key={req._id}>
                  <td>{idx + 1}</td>
                  <td>{req.petName}</td>
                  <td>
                    <img
                      src={req.petImage}
                      alt={req.petName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{req.adopterName}</td>
                  <td>{req.adopterEmail}</td>
                  <td>{req.phone}</td>
                  <td>{req.address}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.status === "Accepted"
                          ? "badge-success"
                          : req.status === "Rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {req.status || "Pending"}
                    </span>
                  </td>
                  <td className="space-x-2 space-y-2">
                    <button
                      onClick={() => handleStatusChange(req._id, "Accepted")}
                      className="btn btn-sm btn-success"
                      disabled={req.status === "Accepted"}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(req._id, "Rejected")}
                      className="btn btn-sm btn-error mt-4 md:mt-0"
                      disabled={req.status === "Rejected"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdoptionRequest;
