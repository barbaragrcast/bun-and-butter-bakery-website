import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/product"; // import Product
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
  const [isLoading, setIsLoading] = useState(true); // added isLoading
  const navigate = useNavigate();

  // Fetch products from API
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

  // Filter products based on searchTerm
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, product);
      setCartList((prev) => [...prev, product]); // update local cart
      if (parentAddToCart) parentAddToCart(product); // also update App cart
      navigate("/cart"); // navigate to cart page
    } catch (err) {
      console.error("Failed to add product to cart", err);
    }
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  // Render products view
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
              <Product product={product} />
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
      </div>
    </>
  );

  // Render cart view
  const renderCart = () => (
    <div id="cart-container">
      <button onClick={() => navigateTo(PAGE_PRODUCTS)} id="products-btn">
        Back to Products
      </button>

      <h1 id="cart-title">Cart</h1>

      {cartList.map((product, idx) => (
        <div className="card card-container" key={idx}>
          <div id="product">
            <img src={product.image || productImg} alt={product.name} />
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