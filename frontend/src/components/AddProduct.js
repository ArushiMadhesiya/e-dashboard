import React, { useState } from 'react';

const AddProduct = () => {
  const auth = localStorage.getItem('user');
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    userId: JSON.parse(auth)._id, 
    company: ''
  });
  const [err, setErr] = useState({
    name: false,
    category: false,
    company: false,
    price: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Validate field while typing
    const errors = { ...err };
    if (name === 'name') {
      errors.name = value.trim() === '';
    } else if (name === 'price') {
      errors.price = isNaN(value) || value <= 0;
    } else if (name === 'category') {
      errors.category = value.trim() === '';
    } else if (name === 'company') {
      errors.company = value.trim() === '';
    }
    setErr(errors);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Check if there are any errors
    if (Object.values(err).some(error => error)) {
      return; // If there are errors, prevent form submission
    }
    // If no errors, submit the form
    let result = await fetch("http://localhost:3001/add-product", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(result);
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
          {err.name && <span style={{ color: 'red' }}>Please enter a valid name</span>}
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
          {err.price && <span style={{ color: 'red' }}>Please enter a valid price</span>}
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
          {err.category && <span style={{ color: 'red' }}>Please enter a valid category</span>}
        </div>
        <div>
          <label>Company:</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
          {err.company && <span style={{ color: 'red' }}>Please enter a valid company</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
