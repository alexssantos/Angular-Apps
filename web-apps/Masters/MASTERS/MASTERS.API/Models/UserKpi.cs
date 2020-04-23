using System.Collections.Generic;

namespace MASTERS.API.Models
{
	public class UserKpi
	{
		public long Id { get; set; }
		public string Name { get; set; }
		public string NickName { get; set; }
		public int Position { get; set; }

		public int LastPosition { get; set; }
		public virtual List<Kpi> KpiList { get; set; }

	}
}
