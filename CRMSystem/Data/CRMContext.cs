/*This file manages interaction with the database using Entity Framework Core. 
//It defines the CRMContext class, which inherits from DbContext. 
The CRMContext class contains a DbSet<Customer> property that represents the Customers table in the database. 
It allows CRUD operations on the customer table*/

using Microsoft.EntityFrameworkCore;
using CRMSystem.Models;

namespace CRMSystem.Data
{
    public class CRMContext : DbContext
    {
//
        public CRMContext(DbContextOptions<CRMContext> options) : base(options) { } //constructor that passes connection string options to the base class

        public DbSet<Customer> Customers { get; set; }// dedefines a DbSet property for the Customers table in the database
    }
}
