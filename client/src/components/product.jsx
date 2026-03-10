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

     <p className="product-description">{product.description}</p>
    <p className="product-price">${product.price}</p>

      {addToCart && (
        <button className="add-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;