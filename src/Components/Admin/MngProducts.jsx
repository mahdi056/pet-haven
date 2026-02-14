import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const MngProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };

  const handleApprove = async (id) => {
    await axios.patch(`http://localhost:5000/products/approve/${id}`);
    fetchProducts();
    toast.success("Product Accepted",{
        position: 'top-center',
        autoClose: 2000,
    })
  };

  const handleReject = async (id) => {
    await axios.patch(`http://localhost:5000/products/reject/${id}`)
    fetchProducts();
    toast.error("Product Rejected", {
      position: 'top-center',
    autoClose: 2000
      })
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts();
    toast.error("Product Deleted", {
        position: 'top-center',
        autoClose: 2000
    })
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
        <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-md">
            <figure>
              <img className="object-contain" src={product.image} alt={product.name} />
            </figure>

            <div className="card-body">
              <h2 className="card-title">Name: {product.name}</h2>
              <p>Price: {product.price}</p>
              <p>Size: {product.size}</p>
              <p className="text-sm">Description: {product.description}</p>

              <p className="text-sm">
                Adder Name: {product.adderName}
              </p>
              <p className="text-sm">
                Adder Email: {product.adderEmail}
              </p>

              <p className="font-semibold">
                Approved: {product.approve}
              </p>

              <div className="card-actions justify-between mt-4">
                <button
                  onClick={() => handleApprove(product._id)}
                  className="btn btn-success btn-sm"
                  disabled={product.approve === "Accepted"}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(product._id)}
                  className="btn bg-orange-500 btn-sm"
                  disabled={product.approve === "Rejected"}
                >
                  Reject
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MngProducts;
