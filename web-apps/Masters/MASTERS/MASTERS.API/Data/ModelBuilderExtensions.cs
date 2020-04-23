using MASTERS.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace MASTERS.API.Data
{
	public static class ModelBuilderExtensions
	{
		private static int GetRandom(int max) => new Random().Next(max);
		private static int GetRandomId() => GetRandom(int.MaxValue);

		public static void Seed(this ModelBuilder modelBuilder)
		{
			// User (1 x *) Kpi
			modelBuilder.Entity<User>()
				.HasMany(user => user.KpiList)
				.WithOne(kpi => kpi.User);

			ProcessSeed(modelBuilder);
		}


		public static void ProcessSeed(ModelBuilder modelBuilder)
		{
			List<User> userList = new List<User>();
			List<Kpi> kpiList = new List<Kpi>();

			for (int i = 0; i < 40; i++)
			{
				User user = BuildUser(i);

				List<Kpi> kpis = new List<Kpi>() {
					BuildKpi("danger", "KPI-1"),
					BuildKpi("success", "KPI-2"),
					BuildKpi("info",  "KPI-3"),
					BuildKpi("warning", "KPI-4")
				};

				//UserDetails userDetails = new UserDetails();

				kpiList.AddRange(kpis);
				userList.Add(user);
			};

			modelBuilder.Entity<Kpi>().HasData(kpiList);
			modelBuilder.Entity<User>().HasData(userList);

		}

		public static Kpi BuildKpi(string classWrap, string title)
		{
			Kpi item = new Kpi()
			{
				Id = GetRandomId(),
				Score = GetRandom(1000),
				ClassWrapperName = classWrap,
				Title = title
			};
			return item;
		}

		public static int GetRandomChoice()
		{
			int ran = GetRandom(10);
			return (ran < 3) ? -1
							: (ran > 7) ? 1
										: 0;
		}

		public static User BuildUser(int i)
		{
			long id = GetRandomId();
			string idUserName = "user" + id + "-master";

			User user = new User()
			{
				Id = id,
				Name = "Usuario " + i + 1,
				NickName = idUserName,
				Position = i + 1,
				LastPosition = GetRandomChoice()
			};

			return user;
		}
	}
}
