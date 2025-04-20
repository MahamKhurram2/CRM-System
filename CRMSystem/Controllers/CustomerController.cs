// handles api requests for customer data
// CRUD operations for customer data
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRMSystem.Data;
using CRMSystem.Models;

namespace CRMSystem.Controllers
{   // This controller handles API requests for customer data
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CRMContext _context; // The database context for accessing customer data

        public CustomerController(CRMContext context)//     Constructor that initializes the controller with crmContext
        {
            _context = context;
        }

        // GET: api/customer 
        // This method retrieves all customers from the database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync(); //Returns a list of all customers
        }

        // GET: api/customer/{id}
        // This method retrieves a specific customer by ID from the database
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }

        // POST: api/customer
        // This method creates a new customer in the database
       [HttpPost]
public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
{
    _context.Customers.Add(customer); //add the customer to the context
    await _context.SaveChangesAsync();//save changes to the database
    return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);//return the created customer with a 201 status code
}


        // PUT: api/customer/{id}
        // This method updates an existing customer in the database
        [HttpPut("{id}")]
public async Task<IActionResult> PutCustomer(int id, Customer customer)
{
    // Check if the customer id matches the provided id in the URL
    if (id != customer.Id)
    {
        return BadRequest();  // Return BadRequest if IDs don't match
    }

    // Mark the entity state as modified
    _context.Entry(customer).State = EntityState.Modified;

    try
    {
        // Attempt to save changes to the database
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        // Handle any potential issues when saving to the database
        if (!_context.Customers.Any(c => c.Id == id))
        {
            return NotFound();  // Return NotFound if the customer doesn't exist
        }
        else
        {
            throw;
        }
    }

    // Return NoContent on success
    return NoContent();
}


        // DELETE: api/customer/{id}
        // This method deletes a specific customer by ID from the database
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id); //
            if (customer == null)
            {
                return NotFound();//return not found if the customer does not exist
            }

            _context.Customers.Remove(customer); //remove the customer from the context
            await _context.SaveChangesAsync();//save changes to the database
            return NoContent(); //return no content if successful i.e return 204
        }
    }
}
