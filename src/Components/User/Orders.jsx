import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { MdDelete } from "react-icons/md";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const sellerEmail = user?.email;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (sellerEmail) {
      fetchSellerOrders();
    }
  }, [sellerEmail]);

  const fetchSellerOrders = async () => {
    const res = await axios.get(
      `http://localhost:5000/seller-orders/${sellerEmail}`
    );
    setOrders(res.data);
  };

  const handleDeleteOrder = async (id) => {

    try {
      await axios.delete(`http://localhost:5000/order/${id}`);


      setOrders((prev) => prev.filter((item) => item._id !== id));

      
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-500 mb-8">
          Seller Orders
        </h2>

        {orders.length === 0 ? (
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <p className="text-lg">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const sellerItems = order.items.filter(
                (item) => item.adderEmail === sellerEmail
              );

              const sellerTotal = sellerItems.reduce(
                (total, item) => total + parseFloat(item.price),
                0
              );

              return (
                <div
                  key={order._id}
                  className="card bg-base-100 shadow-lg p-6"
                >
                  {/* Buyer Info Section */}
                  <div className="mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold text-orange-500 mb-2">
                      Buyer Information
                    </h3>
                    <p><span className="font-medium">Name:</span> {order.buyerName}</p>
                    <p><span className="font-medium">Email:</span> {order.buyerEmail}</p>
                    <p><span className="font-medium">Phone:</span> {order.buyerPhone}</p>
                    <p><span className="font-medium">Address:</span> {order.address}</p>
                    <p><span className="font-medium">Payment:</span> {order.paymentMethod}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Order Date: {new Date(order.orderDate).toLocaleString()}
                    </p>
                  </div>

                  {/* Products Section */}
                  <div className="space-y-4">
                    {sellerItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 border-b pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">
                            {item.name}
                          </h4>
                          <p>Size: {item.size}</p>
                          <p className="font-medium text-orange-500">
                            ৳ {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Seller Total */}
                  <div className="mt-6 text-right flex justify-between">
                    <h3 className="text-xl font-bold text-orange-500">
                      Your Total: ৳ {sellerTotal}
                    </h3>
                    <button
                    onClick={()=> handleDeleteOrder(order._id)}
                    className="btn btn-error btn-sm">Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
