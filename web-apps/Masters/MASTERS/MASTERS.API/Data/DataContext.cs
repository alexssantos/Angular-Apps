using MASTERS.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MASTERS.API.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{ }

		//tables
		public DbSet<UserDetails> UserDetails { get; set; }
		public DbSet<User> UserKpis { get; set; }
		public DbSet<Kpi> Kpis { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Seed();
		}
	}
}
