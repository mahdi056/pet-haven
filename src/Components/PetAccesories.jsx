import { useEffect, useState } from "react";
import axios from "axios";

const PetAccesories = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchApprovedProducts();
  }, []);

  const fetchApprovedProducts = async () => {
    const res = await axios.get("http://localhost:5000/products/approved");
    setProducts(res.data);
  };

  const handleAddToCart = (product) => {
    // later you can connect this to cart collection / context
    console.log("Added to cart:", product);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl text-center font-bold mb-6">Pet Accessories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-md">
            <figure className="h-48">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover h-full w-full"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">Name: {product.name}</h2>

              <p className="font-semibold">Price: {product.price}</p>
              <p>Size: {product.size}</p>
              <p>Description: {product.description}</p>

              <div className="card-actions mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-warning w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-center col-span-full">
            No approved products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PetAccesories;
