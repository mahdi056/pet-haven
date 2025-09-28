import { Link, NavLink } from 'react-router';
import petLogo from '../assets/petLogo.png';
import { useContext } from 'react';
import { AuthContext } from './Provider/AuthProvider';
import { RxAvatar } from "react-icons/rx";
const Header = () => {
  const { user, SignOut } = useContext(AuthContext);

console.log(user?.displayName);
console.log(user?.email);
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='/petlist'>Pet List</NavLink></li>
              <li><NavLink to='/donationcampaigns'>Donation Campaigns</NavLink></li>
              {
               user && user.emailVerified && (<li><NavLink to='/dashboard'>Dashboard</NavLink></li>)
              }
            </ul>
          </div>
          <Link to='/'><div className='flex items-center'>
            <img src={petLogo} alt="Pet Haven Logo" />
            <a className="btn btn-ghost text-2xl text-warning font-bold hidden md:block">Pet Haven</a>
          </div></Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/petlist'>Pet List</NavLink></li>
            <li><NavLink to='/donationcampaigns'>Donation Campaigns</NavLink></li>
            {/* <li><NavLink to='/payment'>Payment</NavLink></li> */}
            
            
            {
               user && user.emailVerified && (<li><NavLink to='/dashboard'>Dashboard</NavLink></li>)
              } 
               
            
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {
            user && user.emailVerified ? (<button 
              onClick={SignOut} 
              className='btn btn-outline btn-error'>Logout</button>)
              :
              (<Link to='/login'><button className='btn btn-warning'>Login</button></Link>)



          }
        </div>
      </div>
    </div>
  );
};

export default Header;
