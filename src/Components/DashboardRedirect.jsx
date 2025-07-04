import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";
import axios from "axios";

const DashboardRedirect = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get('https://pet-haven-server-mu.vercel.app/users')
        .then(res => {
          const currentUser = res.data.find(u => u.email === user.email);
          if (currentUser) {
            setRole(currentUser.role);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  if (loading) return <p>Loading...</p>;

  if (role === 'admin') {
    return <Navigate to="/dashboard/users" replace />;
  }

  // default to user
  return <Navigate to="/dashboard/addpet" replace />;
};

export default DashboardRedirect;
