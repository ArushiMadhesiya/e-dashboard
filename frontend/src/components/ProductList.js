import React, { useEffect, useState } from "react";
import "./ProductList.css"; // Import CSS file for styling

// Product component to display individual product details
const Product = ({ name, price, category, company }) => (
  <div className="product-card">
    <div className="product-name">{name}</div>
    <div className="product-info">
      <div className="product-price">${price}</div>
      <div className="product-category">{category}</div>
      <div className="product-company">by {company}</div>
    </div>
  </div>
);


// ProductList component to display a list of products
const ProductList = () => {
  const [products, setter] = useState([]);
  useEffect(() => {
    const f = async () => {
        // Define the products array internally
        let products = await fetch("http://localhost:3001/products");
        products = await products.json();
        setter(products);
      };
      f();
  },[]);
  return (
    <div className="product-container">
      {products.map((product) => (
        <Product
          key={product._id}
          name={product.name}
          price={product.price}
          category={product.category}
          company={product.company}
        />
      ))}
    </div>
  );
};

export default ProductList;
