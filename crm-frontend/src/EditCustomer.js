// This component allows users to edit customer details.
// It fetches the customer data based on the ID from the URL and allows users to update it.
// Retrieves the customer details from the backend, updates them, and sends the data back.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// EditCustomer component to handle customer updates
const EditCustomer = () => {
    const { id } = useParams();  // Get customer id from the URL
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message visibility
    const navigate = useNavigate();

    // Fetch the customer data to edit
    useEffect(() => { // API request to fetch the customer details by id
        axios.get(`http://localhost:5221/api/customer/${id}`)
            .then(response => {
                const customer = response.data;
                setName(customer.name);
                setEmail(customer.email);
                setPhoneNumber(customer.phoneNumber);
            })
            .catch(error => {
                console.error('There was an error fetching the customer data!', error);
            });
    }, [id]); 

    // Handle form submission to update customer
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const updatedCustomer = { id, name, email, phoneNumber };
    
        console.log("Updated customer data:", updatedCustomer);  // Log the data being sent
    
        // Ensure that the request URL is correctly formatted
        axios.put(`http://localhost:5221/api/customer/${id}`, updatedCustomer)
            .then(response => {
                console.log('Customer updated successfully:', response);  // Log the successful response
                setShowSuccessMessage(true); // Show success message
                setTimeout(() => {
                    setShowSuccessMessage(false); // Hide success message after 3 seconds
                    navigate('/customer-list');  // Redirect to customer list after success
                }, 3000);
            })
            .catch(error => {
                console.error('There was an error updating the customer!', error);  // Log any errors
            });
    };
    

    return (
        // Render the form to edit an existing customer
        // The form includes fields for name, email, and phone number.
        // It also includes a success message popup that appears after successful update.
        <div className="edit-customer">
            <h1>Edit Customer</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="form-input"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    required
                    className="form-input"
                />
                <button type="submit" className="btn btn-primary">Update Customer</button>
            </form>

            {/* Success Message Popup */}
            {showSuccessMessage && (
                <div className="popup">
                    <p>Customer Updated Successfully!</p>
                </div>
            )}
        </div>
    );
};

export default EditCustomer;
