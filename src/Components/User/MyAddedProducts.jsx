import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";

const MyAddedProducts = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (userEmail) {
      fetchProducts();
    }
  }, [userEmail]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/my-products/${userEmail}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff7a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(
          `http://localhost:5000/products/${id}`
        );

        setProducts(products.filter((item) => item._id !== id));

        Swal.fire("Deleted!", "Product has been deleted.", "success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-500 mb-8">
          My Added Products
        </h2>

        {products.length === 0 ? (
          <div className="card bg-base-100 p-6 text-center">
            <p>You haven't added any products yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="card bg-base-100 shadow-md p-4"
              >
               

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />

                <div className="mt-4 space-y-1">
                  <h3 className="font-bold text-lg">
                    {product.name}
                  </h3>
                  <p>Price: {product.price} BDT</p>
                  <p>Stock: {product.stock}</p>
                  <p>Status: {product.approve}</p>
                  <p className="text-sm text-gray-500">
                    Created At: {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>

                 <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdDelete size={24} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedProducts;