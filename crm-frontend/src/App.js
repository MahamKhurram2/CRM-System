// The code below is the main entry point of the React application.
// It hadels routing and imports necessary components for the application.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import Routes and Route from react-router-dom
import './App.css';
import WelcomePage from './WelcomePage';  // Import Welcome Page
import CustomerList from './CustomerList';  // Import Customer List
import AddCustomer from './AddCustomer';  // Import Add Customer
import EditCustomer from './EditCustomer'; // Import Edit Customer

// This is the main App component that sets up routing for the application
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>  {/* Using Routes */}
          <Route path="/" element={<WelcomePage />} />  {/* Route for WelcomePage */}
          <Route path="/customer-list" element={<CustomerList />} />  {/* Route for Customer List */}
          <Route path="/add-customer" element={<AddCustomer />} />  {/* Route for Add Customer */}
          <Route path="/edit-customer/:id" element={<EditCustomer />} />  {/* Route for Edit Customer */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
