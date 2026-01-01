import { useContext, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const Addproduct = () => {
  const [image, setImage] = useState(null);
  const {user} = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    size: "",
    description: "",
  });



  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. upload image to ImgBB
      const imageData = new FormData();
      imageData.append("image", image);

      const imageRes = await axios.post(imageHostingURL, imageData);

      const imageUrl = imageRes.data.data.display_url;

      // 2. prepare product data
      const productData = {
        name: product.name,
        price: product.price,
        size: product.size,
        description: product.description,
        image: imageUrl,
        adderName: user.displayName,
        adderEmail: user.email
      };

      

    
      const res = await axios.post("http://localhost:5000/products", productData);

      if (res.data.insertedId) {
        toast.success("Product added successfully. Please wait for Admin Response", {
            position: 'top-center',
            autoClose: 2000,
        });
        setProduct({
          name: "",
          price: "",
          size: "",
          description: "",
        });
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong",{
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
        <ToastContainer></ToastContainer>
  <h2 className="text-2xl font-bold mb-4">Add Product</h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="file-input file-input-bordered w-full"
      required
    />

    <input
      type="text"
      name="name"
      placeholder="Product Name"
      value={product.name}
      onChange={handleChange}
      className="input input-bordered w-full"
      required
    />

    <input
      type="number"
      name="price"
      placeholder="Product Price"
      value={product.price}
      onChange={handleChange}
      className="input input-bordered w-full"
      required
    />

    <input
      type="text"
      name="size"
      placeholder="Product Size"
      value={product.size}
      onChange={handleChange}
      className="input input-bordered w-full"
      required
    />

    <textarea
      name="description"
      placeholder="Product Description"
      value={product.description}
      onChange={handleChange}
      className="textarea textarea-bordered w-full"
      required
    ></textarea>

    <button type="submit" className="btn btn-warning w-full">
      Add Product
    </button>
  </form>
</div>

  );
};

export default Addproduct;
