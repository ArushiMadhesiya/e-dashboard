import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const UpdateProduct = () => {
    const params = useParams();
    const productId=params.id;
    console.warn(productId);
  // State variables to hold form data
  const [formData,setFormData]=useState({
    name: '',
    price: 0,
    category: '',
    company: ''
  });
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=async()=>{
    console.warn("hi");
    // api call for prefilling 
    const url= `http://localhost:3001/products/${productId}`;
    let data=await fetch(url)
    data=await data.json();
    console.warn("already present", data);
    setFormData(data)
}
  // Function to handle form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Here you can send the form data to your backend or handle it as needed
   
   
        const url = `http://localhost:3001/products/${productId}`;

        const response = await fetch(url, {
          method: 'PUT', // or 'POST' if your API endpoint is configured to accept POST requests
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
    
        // Optionally, you can handle the response here
        const updatedData = await response.json();
        
        console.log('Product updated:', updatedData);
    setFormData({
        name: '',
        price: 0,
        category: '',
        company: ''
      });
  };

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <div>
      <h2>Update Product</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
