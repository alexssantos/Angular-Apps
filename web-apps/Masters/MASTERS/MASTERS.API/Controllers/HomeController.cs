using Microsoft.AspNetCore.Mvc;

namespace MASTERS.API.Controllers
{
	[Route("api/Home")]
	[ApiController]
	public class HomeController : ControllerBase
	{



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