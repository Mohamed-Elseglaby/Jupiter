using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace Students.DAL;

public class StudentsContext : DbContext
{

    public StudentsContext(DbContextOptions<StudentsContext> options) : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {


        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Student> Students => Set<Student>();
}
