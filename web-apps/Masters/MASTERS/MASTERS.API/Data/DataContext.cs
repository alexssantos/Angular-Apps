using MASTERS.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace MASTERS.API.Data
{
	public class DataContext : DbContext
	{
		public static long idIndex = 0;
		private int GetRandom(int max) => new Random().Next(max);

		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{ }

		//tables
		public DbSet<UserDetails> UserDetails { get; set; }
		public DbSet<UserKpi> UserKpis { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// global query default.

			// Allow Soft delete						
		}

		public void SeedDatabase()
		{
			List<UserKpi> usersKpi = new List<UserKpi>();
			for (int i = 0; i < 40; i++)
			{

				var kpis = new List<Kpi>() {
					BuildKpi("danger", "KPI-1"),
					BuildKpi("success", "KPI-2"),
					BuildKpi("info",  "KPI-3"),
					BuildKpi("warning", "KPI-4")
				};


				var userKpis = BuildUser(i, kpis);

				usersKpi.Add(userKpis);
			};


			//List<UserDetails> userDetailsList = new List<UserDetails>();
			//userDetailsList.Add(userTeste.userDetails);
		}

		public Kpi BuildKpi(string classWrap, string title)
		{
			Kpi item = new Kpi()
			{
				Score = GetRandom(1000),
				ClassWrapperName = classWrap,
				Title = title
			};
			return item;
		}


		public int GetRandomChoice()
		{
			int ran = GetRandom(10);
			return (ran < 3) ? -1
							: (ran > 7) ? 1
										: 0;
		}

		public UserKpi BuildUser(int i, List<Kpi> kpis)
		{
			idIndex += 1;

			string idUserName = "user" + GetRandom(99999) + "-master";

			UserKpi user = new UserKpi()
			{
				Id = idIndex,
				Name = "Usuario " + i + 1,
				NickName = idUserName,
				Position = i + 1,
				KpiList = kpis,
				LastPosition = GetRandomChoice()
			};

			return user;
		}
	}
}
