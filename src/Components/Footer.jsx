const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-orange-400">Pet Haven</h2>
            <p className="mt-2 text-sm text-gray-300">
              A safe and loving platform for pet adoption and support. Find your new best friend or help others do the same.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/petlist" className="hover:underline">Browse Pets</a></li>
              <li><a href="/donationcampaigns" className="hover:underline">Donation Campaigns</a></li>
              <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300">Email: support@pethaven.com</p>
            <p className="text-sm text-gray-300 mt-1">Phone: +880 1707226784</p>
            <p className="text-sm text-gray-300 mt-1">Location: Sylhet, Bangladesh</p>
          </div>
        </div>
  
        <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Pet Haven. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  