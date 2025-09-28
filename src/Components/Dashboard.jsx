import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";
import { IoMdAdd } from "react-icons/io";
import { MdPets } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import { MdCreateNewFolder } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [currentUserRole, setCurrentUserRole] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((res) => {
        const loggedInUser = res.data.find((u) => u.email === user.email);


        if (loggedInUser) {
          setCurrentUserRole(loggedInUser.role);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [user.email]);

  
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-warning text-white font-semibold rounded-lg px-4 py-2 block flex items-center gap-x-2"
      : "text-gray-700 hover:bg-gray-200 rounded-lg px-4 py-2 block flex items-center gap-x-2";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}

      {user&& currentUserRole == 'user' &&
        (
          <>

            <aside className="w-full lg:w-64 bg-white shadow-md">
              {/* mobile Dropdown */}

              <div className="md:hidden p-4 border-b">
                <div tabIndex={0} className="btn btn-warning w-full">
                  Dashboard Menu
                </div>
                <ul
                  tabIndex={0}
                  className="menu mt-2 shadow bg-base-100 rounded-box w-full p-2 space-y-1"
                >
                  <li><NavLink to="/dashboard/addpet" className={navLinkClass}><IoMdAdd></IoMdAdd>Add a Pet</NavLink></li>
                  <li><NavLink to="/dashboard/myaddedpets" className={navLinkClass}><MdPets></MdPets>My Added Pets</NavLink></li>

                  <li><NavLink to="/dashboard/adoptionrequest" className={navLinkClass}><CiSquareQuestion></CiSquareQuestion>Adoption Request</NavLink></li>
                  <li><NavLink to="/dashboard/createdonationcampaign" className={navLinkClass}><MdCreateNewFolder></MdCreateNewFolder>Create Donation Campaign</NavLink></li>
                  <li><NavLink to="/dashboard/mydonationcampaigns" className={navLinkClass}><FaDonate></FaDonate>My Donation Campaigns</NavLink></li>
                  <li><NavLink to="/dashboard/mydonations" className={navLinkClass}><BiDonateHeart></BiDonateHeart>My Donations</NavLink></li>
                  <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                </ul>
              </div>

              {/* Dekstop Sidebar */}
              <div className="hidden md:flex flex-col p-6 space-y-3">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard</h2>
                <NavLink to="/dashboard/addpet" className={navLinkClass}><IoMdAdd></IoMdAdd>Add a Pet</NavLink>
                <NavLink to="/dashboard/myaddedpets" className={navLinkClass}><MdPets></MdPets>My Added Pets</NavLink>
                <NavLink to="/dashboard/adoptionrequest" className={navLinkClass}><CiSquareQuestion></CiSquareQuestion>Adoption Request</NavLink>
                <NavLink to="/dashboard/createdonationcampaign" className={navLinkClass}><MdCreateNewFolder></MdCreateNewFolder>Create Donation Campaign</NavLink>
                <NavLink to="/dashboard/mydonationcampaigns" className={navLinkClass}><FaDonate></FaDonate>My Donation Campaigns</NavLink>
                <NavLink to="/dashboard/mydonations" className={navLinkClass}><BiDonateHeart></BiDonateHeart>My Donations</NavLink>
                <NavLink to="/" className={navLinkClass}><FaHome></FaHome>Home</NavLink>
              </div>


            </aside>

          </>
        )
      }

      {
        user && currentUserRole == 'admin' && (
          <>

            <aside className="w-full lg:w-64 bg-white shadow-md">
              {/* mobile Dropdown */}

              <div className="md:hidden p-4 border-b">
                <div tabIndex={0} className="btn btn-warning w-full">
                  Welcome Admin
                </div>
                <ul
                  tabIndex={0}
                  className="menu mt-2 shadow bg-base-100 rounded-box w-full p-2 space-y-1"
                >
                  <li><NavLink to="/dashboard/users" className={navLinkClass}><FaUsers></FaUsers> Users</NavLink></li>
                  <li><NavLink to="/dashboard/allpets" className={navLinkClass}><MdPets></MdPets>All Pets</NavLink></li>
                  <li><NavLink to="/dashboard/alldonations" className={navLinkClass}><BiDonateHeart></BiDonateHeart>All Donations</NavLink></li>
                  <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>

                </ul>
              </div>

              {/* dekstop Sidebar */}
              <div className="hidden md:flex flex-col p-6 space-y-3">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome Admin</h2>
                <NavLink to="/dashboard/users" className={navLinkClass}><FaUsers></FaUsers>Users</NavLink>
                <NavLink to="/dashboard/allpets" className={navLinkClass}><MdPets></MdPets>All Pets</NavLink>
                <NavLink to="/dashboard/alldonations" className={navLinkClass}><BiDonateHeart></BiDonateHeart>All Donations</NavLink>

                <NavLink to="/" className={navLinkClass}><FaHome></FaHome>Home</NavLink>
              </div>


            </aside>

          </>
        )
      }


      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
