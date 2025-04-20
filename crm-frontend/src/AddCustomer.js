//This component is responsible for adding a new customer to the CRM system.
//It submits the customer data to the backend API.
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


// AddCustomer component to handle customer addition
const AddCustomer = () => {
    const [name, setName] = useState(''); // State for customer name
    const [email, setEmail] = useState(''); // State for customer email
    const [phoneNumber, setPhoneNumber] = useState(''); // State for customer phone number
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control popup visibility
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
    
        const newCustomer = { name, email, phoneNumber };
        // Log the new customer to make sure the data is being captured
        console.log('Adding new customer:', newCustomer);
    
        // Post request to API
        axios.post('http://localhost:5221/api/customer', newCustomer)
            .then(response => {
                console.log('Response from API:', response); // Log the response from the API
                setShowSuccessMessage(true); // Show success message
                setTimeout(() => {
                    setShowSuccessMessage(false); // HidING success message after 3 seconds
                    navigate('/customer-list');  // RedirectING  to customer list
                }, 3000);
            })
            .catch(error => {
                console.error('There was an error adding the customer!', error);
            });
    };
    

    return (
        // Render the form to add a new customer
        // The form includes fields for name, email, and phone number.
        <div className="add-customer">
            <h1>Add New Customer</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
                <button type="submit">Add Customer</button>
            </form>

            {/* Success Message Popup */}
            {showSuccessMessage && (
                <div className="popup">
                    <p>Customer Added Successfully!</p>
                </div>
            )}
        </div>
    );
};

export default AddCustomer;
