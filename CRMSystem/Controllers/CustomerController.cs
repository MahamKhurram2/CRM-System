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
            _context.Customers.Add(customer); //add the new customer to the context
            await _context.SaveChangesAsync();// save chnages
            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer); //return the newly created customer
        }

        // PUT: api/customer/{id}
        // This method updates an existing customer in the database
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.Id)// //check if the id of the customer matches the id in the url
            {
                return BadRequest(); //return bad request if they do not match
            }
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified; //update the state of the customer to modified
            await _context.SaveChangesAsync(); //save changes to the database
            return NoContent();//return no content if successful i.e return 204
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
