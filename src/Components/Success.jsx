
import { Link} from "react-router";

const Success = () => {

  











  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-2">
          Thank you for your donation. Your support means a lot!
        </p>

        <Link
          to="/donationcampaigns"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Back to Campaigns
        </Link>
      </div>
    </div>
  );
};

export default Success;
