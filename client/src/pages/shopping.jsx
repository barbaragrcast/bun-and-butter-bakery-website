// Shopping.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/product";
import productImg from "../images/productImg.png";
import { useNavigate } from "react-router-dom";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Shopping = ({ searchTerm, addToCart: parentAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/products`
        );
        setProducts(data.rows || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    try {
      // Add to local cart state
      setCartList((prev) => [...prev, product]);

      // Update parent cart in App.jsx
      if (parentAddToCart) parentAddToCart(product);

      // Send to backend cart table
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, product);

      // Optionally navigate to cart page
      navigate("/cart");
    } catch (err) {
      console.error("Failed to add product to cart", err);
    }
  };

  // Navigate between products and cart
  const navigateTo = (nextPage) => setPage(nextPage);

  // Render products page
  const renderProducts = () => (
    <>
      <header id="shopping-head">
        <button onClick={() => navigateTo(PAGE_CART)} id="goToCart">
          Go to Cart ({cartList.length})
        </button>
      </header>

      {error && <p>{error}</p>}

      <div id="shopping">
        {isLoading && <p>Loading products...</p>}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <h2>No products available at the moment.</h2>
        )}
        {!isLoading &&
          !error &&
          filteredProducts.map((product) => (
            <div className="card" key={product.id}>
              <Product product={product} addToCart={handleAddToCart} />
            </div>
          ))}
      </div>
    </>
  );

  // Render cart page
  const renderCart = () => (
    <div id="cart-container">
      <button onClick={() => navigateTo(PAGE_PRODUCTS)} id="products-btn">
        Back to Products
      </button>

      <h1 id="cart-title">Cart</h1>

      {cartList.map((product, idx) => (
        <div className="card card-container" key={idx}>
          <div id="product">
            <img src={product.image_url || productImg} alt={product.name} />
            <h2>{product.name}</h2>
            <h3>{product.description}</h3>
            <h3>${product.price}</h3>
          </div>
        </div>
      ))}

      <button id="checkout-btn">Checkout</button>
    </div>
  );

  return (
    <div className="main">
      {page === PAGE_PRODUCTS && renderProducts()}
      {page === PAGE_CART && renderCart()}
    </div>
  );
};

export default Shopping;