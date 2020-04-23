namespace MASTERS.API.Models
{
	public class Kpi
	{
		public int Score { get; set; }
		public string ClassWrapperName { get; set; }
		public string IconUrl { get; set; }
		public string Title { get; set; }

		public long UserId { get; set; }
	}
}
