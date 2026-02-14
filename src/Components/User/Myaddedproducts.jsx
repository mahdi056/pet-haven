import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const Myaddedproducts = () => {
  const [products, setProducts] = useState([]);
  const {user} = useContext(AuthContext);

 
  const userEmail = user.email;

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    const res = await axios.get(
      `http://localhost:5000/products/user/${userEmail}`
    );
    setProducts(res.data);
  };

  return (
    <div>
      <h2>My Added Products</h2>

      {products.length === 0 && <p>No products found</p>}

      {products.map((product) => (
        <div key={product._id} style={{ marginBottom: "10px" }}>
          <h4>{product.name}</h4>
          <p>Price: {product.price}</p>
          <p>Status: {product.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Myaddedproducts;
