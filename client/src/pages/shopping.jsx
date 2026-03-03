import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import productImg from "../images/productImg.png"; // fallback image
import Product from "../components/product"; // make sure you have this

const Shopping = ({ searchTerm, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/products`
        );
        setProducts(data.rows || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const handleAddToCart = async (product) => {
    try {
      addToCart(product); // updates cart in App.jsx
      // optional: send to backend cart table
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, product);
      navigate("/cart"); // go to cart page if you want
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className="shopping-page">
      {isLoading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && filteredProducts.length === 0 && (
        <p>No products found</p>
      )}

      <div className="product-grid">
        {!isLoading &&
          filteredProducts.map((product) => (
            <div className="card" key={product.id}>
              <Product product={product} />
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shopping;