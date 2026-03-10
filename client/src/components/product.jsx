import React from "react";
import productImg from "../images/productImg.png";
import ProductName from "./ProductName"; 

const Product = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <div className="img-frame">
        <img src={product.image_url || productImg} alt={product.name} />
      </div>

      
      <ProductName name={product.name} />

      <p>{product.description}</p>
      <p>${product.price}</p>

      {addToCart && (
        <button className="add-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;