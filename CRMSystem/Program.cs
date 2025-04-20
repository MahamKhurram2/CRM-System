// This is the main entry point for the CRM System application.
//Default file 
using Microsoft.EntityFrameworkCore;
using CRMSystem.Data;
using CRMSystem.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
// Configure Entity Framework Core with SQLite database

builder.Services.AddDbContext<CRMContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))); // Using SQLite here 

builder.Services.AddControllers();  // Add API controllers (without Views) since frontend is done o react

var app = builder.Build(); //Build the application

// Seed the database with dummy data (only in development)
//Dummy data seeding for development purposes
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<CRMContext>();

    // Seed dummy data if no data exists
    if (!context.Customers.Any())
    {
        context.Customers.AddRange(
            new Customer { Name = "John Doe", Email = "john.doe@example.com", PhoneNumber = "123-456-7890" },
            new Customer { Name = "Jane Smith", Email = "jane.smith@example.com", PhoneNumber = "987-654-3210" },
            new Customer { Name = "Sam Brown", Email = "sam.brown@example.com", PhoneNumber = "555-123-4567" }
        );

        context.SaveChanges();  // Save changes to the database
    }
}

app.UseHttpsRedirection();  //  Redirect HTTP requests to HTTPS , this is optional
// Map API controllers to routes
app.MapControllers();

app.Run();  // Run the application
