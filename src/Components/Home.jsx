import { Link } from 'react-router';
import banner from '../assets/banner.jpg'
import { FaCat, FaDog, FaFish, FaPaw } from 'react-icons/fa';
import { GiRabbit } from 'react-icons/gi';
import adoptPet from '../assets/adopt-pet.jpg'



const Home = () => {
 
    const categories = [
        { name: 'Cats', icon: <FaCat size={30} /> },
        { name: 'Dogs', icon: <FaDog size={30} /> },
        { name: 'Rabbits', icon: <GiRabbit size={30} /> },
        { name: 'Fish', icon: <FaFish size={30} /> },
        { name: 'Others', icon: <FaPaw size={30} /> },
      ];

      const steps = [
        {
          title: '1. Browse Pets',
          desc: 'Explore our wide variety of pets looking for loving homes.',
        },
        {
          title: '2. Submit Request',
          desc: 'Choose your companion and submit a simple adoption request.',
        },
        {
          title: '3. Meet & Adopt',
          desc: 'Schedule a meeting and welcome your new best friend!',
        },
      ];

      const feedback = [
        {
          name: "Emily Johnson",
          comment: "Pet Haven made the adoption process so smooth. We found our cat Luna and she's been the perfect addition to our family!",
        },
        {
          name: "David Thompson",
          comment: "I was able to support rescue dogs through donation campaigns. Love the mission and transparency!",
        },
        {
          name: "Sophia Lee",
          comment: "From browsing to adoption, every step was simple and heartwarming. Highly recommend Pet Haven!",
        },
      ];

    return (
        <div>
            {/* banner */}
            <section
                className="h-[90vh] bg-cover bg-center flex items-center bg-black opacity-100"
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className="w-full h-full flex items-center">
                    <div className="max-w-4xl mx-auto text-center px-4 text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Find Your New Best Friend at <span className="text-orange-400">Pet Haven</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Adopt. Rescue. Love. Give a pet a forever home today.
                        </p>
                        <Link to="/petlist">
                            <button className="btn btn-warning text-white px-6 py-3 rounded-md text-lg shadow-lg hover:shadow-xl transition">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* pet category */}

            <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Explore Pet Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md p-6 rounded-xl flex flex-col items-center  "
            >
              <div className="text-orange-500 mb-3">{cat.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* call to action */}

    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        
        {/* Image */}
        <div className="flex-1">
          <img
            src={adoptPet}
            alt=""
            className="rounded-xl shadow-lg w-full"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Every Pet Deserves a Loving Home
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            By adopting a pet, you're not just saving a life — you're gaining a loyal companion. Join us in making a difference. Love begins with adoption.
          </p>
          <Link to="/petlist">
            <button className="btn btn-warning text-white px-6 py-3 rounded-md text-lg shadow-md hover:shadow-lg transition">
              Start Your Adoption Journey
            </button>
          </Link>
        </div>
      </div>
    </section>

    {/* about us */}

    <section className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Pet Haven</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          <span className="font-semibold text-orange-500">Pet Haven</span> is more than just a pet adoption platform — it's a community built on love, compassion, and second chances. 
          Our mission is to connect rescued pets with caring families and individuals who are ready to offer them a forever home.
          <br /><br />
          Through our platform, you can explore available pets, request adoptions, and even contribute to ongoing donation campaigns to support animals in need.
          Whether you're looking to adopt or support others who do — Pet Haven makes it easy to make a real difference.
        </p>
      </div>
    </section>

    {/* how it works */}

    <section className="bg-orange-50 py-16">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-orange-500 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* what people say */}

    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
           What People Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {feedback.map((person, index) => (
            <div
              key={index}
              className="bg-orange-50 p-6 rounded-xl shadow-md text-center"
            >
              <p className="text-gray-700 text-sm italic mb-4">"{person.comment}"</p>
              <h4 className="text-md font-semibold text-orange-600">{person.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>

        </div>
    );
};

export default Home;