//Customer Model representing a customer in the CRM system
//
namespace CRMSystem.Models
{
    public class Customer
    {
        public int Id { get; set; } // Unique identifier for the customer
        public string Name { get; set; }// Name of the customer
        public string Email { get; set; } // Email address of the customer
            public string PhoneNumber { get; set; }// Phone number of the customer
    }
}
