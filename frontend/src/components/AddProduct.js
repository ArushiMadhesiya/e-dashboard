import React, { useState } from 'react';

const AddProduct = () => {
  const auth=localStorage.getItem('user');
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    userId:JSON.parse(auth)._id, 
    company: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // You can handle form submission logic here, e.g., send data to backend API
    let result = await fetch("http://localhost:3001/add-product", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      price: 0,
      category: '',
      userId: '',
      company: ''
    });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        
        <div>
          <label>Company:</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
