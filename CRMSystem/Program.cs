// This is the main entry point for the CRM System application.
//Default file 
using Microsoft.EntityFrameworkCore;
using CRMSystem.Data;
using CRMSystem.Models;

var builder = WebApplication.CreateBuilder(args);

// Step 1: Add CORS services to allow cross-origin requests from React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // Allows any origin (like localhost:3000)
              .AllowAnyMethod()   // Allows all HTTP methods (GET, POST, etc.)
              .AllowAnyHeader();  // Allows all headers
    });
});

// Step 2: Add DbContext, Controllers, etc.
builder.Services.AddDbContext<CRMContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));  // Use SQLite

builder.Services.AddControllers();  // Add API controllers (without Views)

// Step 3: Build the app
var app = builder.Build();

// Step 4: Enable CORS middleware (before mapping controllers)
app.UseCors("AllowAll");  // Apply the "AllowAll" policy to all requests

// Step 5: Map API controllers to routes
app.MapControllers();  // Map API controllers (for CRUD operations)

// Step 6: Run the app
app.Run();
