import { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/order-history")
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sorted);
      })
  }, []);

 

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-500 mb-8">
          Admin Order History
        </h2>

        {orders.length === 0 ? (
          <div className="card bg-base-100 p-6 text-center">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="card bg-base-100 shadow-md p-6"
              >
                {/* Order Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>

                    <p>
                      Date:{" "}
                      {new Date(order.orderDate).toLocaleString()}
                    </p>
                    <p>Total: {order.totalPrice} BDT</p>
                    <p>Payment: {order.paymentMethod}</p>
                  </div>

                  <div>
                    <p>
                      <span className="font-semibold">
                        Buyer:
                      </span>{" "}
                      {order.buyerName}
                    </p>
                    <p>Email: {order.buyerEmail}</p>
                    <p>Phone: {order.buyerPhone}</p>
                    <p>Address: {order.address}</p>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Ordered Items */}
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded object-cover"
                      />

                      <div>
                        <h4 className="font-semibold">
                          {item.name}
                        </h4>
                        <p>Size: {item.size}</p>
                        <p>Price: {item.price} BDT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;