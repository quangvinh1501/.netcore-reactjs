using Microsoft.EntityFrameworkCore;
using webapi.Models;
namespace webapi.Entities
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {

        }
        public DbSet<AccountList> AccountList { get; set; }
        public DbSet<ActiveList> ActiveList { get; set; }
        public DbSet<MenuList> MenuList { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccountList>().ToTable("tblaccount");
            modelBuilder.Entity<ActiveList>().ToTable("tblactive");
            modelBuilder.Entity<MenuList>().ToTable("tblmenu");
        }
    }
}
