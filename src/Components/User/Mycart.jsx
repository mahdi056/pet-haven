import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { MdDelete } from "react-icons/md";

const Mycart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);

  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  

  useEffect(() => {
    if (userEmail) {
      fetchCartItems();
      setFormData((prev) => ({
        ...prev,
        email: userEmail,
      }));
    }
  }, [userEmail]);

  const fetchCartItems = async () => {
    const res = await axios.get(
      `http://localhost:5000/cart/${userEmail}`
    );
    setCartItems(res.data);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  const handlePurchase = () => {
    setShowModal(true);
  };

  const handleConfirmOrder = async (e) => {
  e.preventDefault();

  const orderData = {
    buyerName: formData.name,
    buyerEmail: formData.email,
    buyerPhone: formData.phone,
    address: formData.address,
    items: cartItems,
    totalPrice,
    paymentMethod: "Cash On Delivery",
    orderDate: new Date(),
  };

  try {
    const res = await axios.post("http://localhost:5000/orders", orderData);

    // If order is successful
    setCartItems([]);
    setShowModal(false);

    Swal.fire({
      title: "Order Placed!",
      text: "Your order has been successfully placed.",
      icon: "success",
      confirmButtonColor: "#ff7a00",
    });
  } catch (error) {
    
    const message =
      error.response?.data?.message ||
      "Order failed. Please try again.";

    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonColor: "#ff7a00",
    });
  }
};


  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);


      setCartItems((prev) => prev.filter((item) => item._id !== id));

      Swal.fire({
        title: "Deleted!",
        text: "Item removed from cart.",
        icon: "success",
        confirmButtonColor: "#ff7a00",
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-500 mb-8">
          My Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <p className="text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="card card-side bg-base-100 shadow-md p-4"
                >
                  <figure className="w-32 h-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </figure>

                  <div className="card-body">
                
                      <h4 className="card-title">{item.name}</h4>
                    <p>Size: {item.size}</p>
                    <p className="font-semibold">
                      Price: {item.price} BDT
                    </p>
                    

                 
                  </div>

                    <div className="flex ">
                     <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-500 text-xl hover:text-red-700 "
                    >
                      <MdDelete size={28}/>
                    </button>
                   </div>
                </div>
              ))}
            </div>

            <div className="card bg-base-100 shadow-lg mt-10 p-6">
              <h3 className="text-xl font-bold">
                Total: {totalPrice} BDT
              </h3>

              <p className="mt-2 text-gray-500">
                Payment Method: Cash On Delivery
              </p>

              <div className="mt-5">
                <button
                  onClick={handlePurchase}
                  className="btn bg-orange-500 hover:bg-orange-600 text-white border-none"
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Delivery Information
            </h3>

            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Full Address"
                className="textarea textarea-bordered w-full"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
              />

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn bg-orange-500 text-white border-none hover:bg-orange-600"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mycart;
