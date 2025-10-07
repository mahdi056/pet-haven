import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";


const PetLists = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
 

  useEffect(() => {
    axios.get('http://localhost:5000/pet-list')
      .then(res => {
        setPets(res.data);
        setFilteredPets(res.data);
      })
      .catch(err => console.error('Failed to fetch pets:', err));
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = pets;

    if (searchTerm) {
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(pet =>
        pet.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredPets(filtered);
  }, [searchTerm, selectedCategory, pets]);


  const handleViewDetails = (id) => {
        navigate(`/petlist/${id}`);
  }

  


  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Available Pets for Adoption</h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered w-full md:w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="select select-bordered w-full md:w-1/4"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Fish">Fish</option>
            <option value="Bird">Bird</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPets.map(pet => (
            <div key={pet._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
                <p className="text-gray-600">Age: {pet.age}</p>
                <p className="text-gray-600">Location: {pet.location}</p>
             
              <button 
              onClick={()=> handleViewDetails(pet._id)}
              className="mt-4 px-4 py-2 bg-warning text-white rounded hover:bg-orange-600">
                  View Details
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetLists;
