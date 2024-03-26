import React, { useEffect, useState } from "react";
import "./ProductList.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

// Product component to display individual product details
const Product = ({
  id,
  name,
  price,
  category,
  company,
  onDelete,
  onUpdate,
}) => (
  <div className="product-card">
    <div className="product-name">{name}</div>
    <div className="product-info">
      <div className="product-price">${price}</div>
      <div className="product-category">{category}</div>
      <div className="product-company">by {company}</div>
      <button onClick={() => onDelete(id)} className="delete-button">
        Delete
      </button>
      <button onClick={() => onUpdate(id)} className="update-button">
        Update
      </button>
    </div>
  </div>
);

// ProductList component to display a list of products
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete = async (productId) => {
    try {
      await fetch(`http://localhost:3001/products/${productId}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async (productId) => {
    const url = `/update/${productId}`;
    navigate(url);
  };
  
  const handleSearch = async (e) => {
    // search api callimg

    const key = e.target.value;
    if (key) {
      console.warn(key);
      // setter(e);
      let result = await fetch(`http://localhost:3001/search/${key}`);
      result = await result.json();
      console.warn(result);
      setProducts(result);
    }
    else{
      fetchData();
    }
  };
  return (
    <div className="product-container">
      <input
        type="text"
        placeholder="Search..."
        //value={searchQuery}
        onChange={handleSearch}
      />
      { 
        products.length>0?
        products.map((product) => (
        <Product
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          category={product.category}
          company={product.company}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )):
      <h1>no product found</h1>
      }
    </div>
  );
};

export default ProductList;
