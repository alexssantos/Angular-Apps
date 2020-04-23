namespace MASTERS.API.Models
{
	public class Kpi
	{
		public long Id { get; set; }
		public int Score { get; set; }
		public string ClassWrapperName { get; set; }
		public string IconUrl { get; set; }
		public string Title { get; set; }
		public long UserId { get; set; }
		public User User { get; set; }
	}
}
