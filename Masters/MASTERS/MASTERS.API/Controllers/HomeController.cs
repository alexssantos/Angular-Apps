using MASTERS.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace MASTERS.API.Controllers
{
	[Route("api/Home")]
	[ApiController]
	public class HomeController : ControllerBase
	{

		[HttpGet("users")]
		public async Task<IActionResult> Get([FromServices] DataContext context)
		{
			var userList = await context.Users
				.AsNoTracking()
				.ToListAsync();

			return Ok(userList);
		}



		// ============================================
		// TESTE
		// ============================================

		[HttpGet("test")]
		public ActionResult<string> Test()
		{
			return Ok("API it's ON!");
		}
	}
}