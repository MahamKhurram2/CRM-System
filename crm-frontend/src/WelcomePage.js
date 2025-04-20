// This component is the welcome page of the CRM system.
// It provides a brief introduction to the system and a button to navigate to the customer list page.
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const WelcomePage = () => {
    const navigate = useNavigate();  // Initialize navigate function

    // Function to navigate to the Customer List Page
    const goToCustomerList = () => {
        navigate('/customer-list');  // Navigate to the /customer-list route
    };

    return (
        <div className="welcome-page">
              <header className="header">
                <img 
                    src="/logo.jpg"  // Logo file saved in the public folder
                    alt="CRM System Logo"
                    className="header-logo"
                />
                <h1 className="header-title">CRM System</h1>
                <p className="header-subtitle">Manage Your Customer Relationships Efficiently</p>
            </header>

            <div className="welcome-container">
                <h1 className="welcome-title">Welcome to CRM System</h1>
                <p className="welcome-subtitle">
                    A powerful tool to manage customer relationships.
                </p>
                <p className="welcome-description">
                    You can add, edit, and manage your customer information right here. Ready to get started?
                </p>
                <button onClick={goToCustomerList} className="btn btn-primary">
                    Go to Customer List
                </button>
            </div>

            <footer className="footer">
                <p>&copy; 2025 CRM System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default WelcomePage;
