using System.Collections.Generic;

namespace MASTERS.API.Models
{
	public class User
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public string NickName { get; set; }
		public int Position { get; set; }

		public int LastPosition { get; set; }
		public ICollection<Kpi> KpiList { get; set; }

	}
}
