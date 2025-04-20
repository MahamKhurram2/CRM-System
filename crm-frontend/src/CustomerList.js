// This component is responsible for displaying a list of customers.
//This component fetches the customer data from the backend API and displays the list. It also handles customer deletion.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch customers from the backend API
    useEffect(() => {
        axios.get('http://localhost:5221/api/customer')  // API endpoint for customers
            .then(response => {
                setCustomers(response.data);  // Set customer data
                setLoading(false);  // Set loading state to false
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error); // Log error
                setLoading(false);
            });
    }, []);

    // Function to delete a customer
    const deleteCustomer = (id) => {
        axios.delete(`http://localhost:5221/api/customer/${id}`)
            .then(response => {
                setCustomers(customers.filter(customer => customer.id !== id)); // Update the list
            })
            .catch(error => {
                console.error('There was an error deleting the customer!', error);
            });
    };
  // Loading state to show a loading message while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        // Render the customer list
        // The customer list is displayed in a table format with options to edit and delete each customer.
        <div className="customer-list">
            <h1>Customer List</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>
                                {/* Edit Link */}
                                <Link to={`/edit-customer/${customer.id}`} className="action-link">Edit</Link>
                                
                                {/* Delete Button */}
                                <span 
                                    onClick={() => deleteCustomer(customer.id)} 
                                    className="action-link delete-link"
                                >
                                    Delete
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Add New Customer Link */}
            <Link to="/add-customer" className="action-link add-customer-link">Add New Customer</Link>
        </div>
    );
};

export default CustomerList;
