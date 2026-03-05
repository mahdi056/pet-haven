import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { AuthContext } from "./Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const PetAccesories = () => {
  const [products, setProducts] = useState([]);
  const {user} = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchApprovedProducts();
  }, []);

  const fetchApprovedProducts = async () => {
    const res = await axios.get("http://localhost:5000/products/approved");
    setProducts(res.data);
  };


  const fetchUserCart = async () => {
    if (user?.email) {
      const res = await axios.get(`http://localhost:5000/cart-user?email=${user.email}`);
      console.log(res.data);
      setCartItems(res.data);
    }
  };

  useEffect(() => {
  fetchApprovedProducts();
  // Call this here!
  if (user?.email) {
    fetchUserCart();
  }
}, [user]);

 const handleAddToCart = async (product) => {
  const userEmail = user.email; 

  const cartItem = {
    productId: product._id,
    name: product.name,
    size: product.size,
    price: product.price,
    image: product.image,
    adderEmail: product.adderEmail,
    userEmail: userEmail,
    
  };

  const itemsInCart = cartItems.filter(item => item.productId === product._id).length;
    const dbStock = Number(product.stock);

    // 3. CHECK: If I add one more, will it exceed stock?
    if (itemsInCart + 1 > dbStock) {
      toast.error(`You can't add more! Only ${dbStock} available in stock.`, {
        position: 'top-center'
      });
      return; // Stop here! Don't call the API.
    }


  try {
    const res = await axios.post(
      "http://localhost:5000/cart",
      cartItem
    );

    if (res.data.insertedId) {
      toast.success("Added to cart", {
        position: 'top-center',
        autoClose: 2000,
      });
    } 
  } catch (error) {
    console.error(error);
    toast.error("Failed to add to cart");
  }
};

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer></ToastContainer>
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
              <p>In Stock: {product.stock}</p>
              <p>Description: {product.description}</p>

              <div className="card-actions mt-4">

              {
                user ?

                ( <button
                disabled={product.stock == 0}
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-warning w-full"
                >
                  Add to Cart
                </button>)
                :
                ( <Link to='/login'>
                <button
                  
                  className="btn btn-warning w-full"
                >
                  Add to Cart
                </button></Link>)
              }

               
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-center col-span-full">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PetAccesories;
