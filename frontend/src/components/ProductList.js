import React, { useEffect, useState } from "react";
import "./ProductList.css"; // Import CSS file for styling

// Product component to display individual product details
const Product = ({ id, name, price, category, company, onDelete }) => (
  <div className="product-card">
    <div className="product-name">{name}</div>
    <div className="product-info">
      <div className="product-price">${price}</div>
      <div className="product-category">{category}</div>
      <div className="product-company">by {company}</div>
      <button onClick={() => onDelete(id)} className="delete-button">Delete</button>
    </div>
  </div>
);


// ProductList component to display a list of products
const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await fetch(`http://localhost:3001/products/${productId}`, {
        method: "DELETE"
      });
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-container">
      {products.map((product) => (
        <Product
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          category={product.category}
          company={product.company}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
