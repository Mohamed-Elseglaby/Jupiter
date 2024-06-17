using Microsoft.EntityFrameworkCore;
using Students.BL;
using Students.DAL;
using Students.DAL.Repo;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        // Allow requests from specific origin
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<Istudent, StudentsRepo>();
builder.Services.AddScoped<IstudentManager, StudentManager>();


string connectionString = builder.Configuration.GetConnectionString("StudentSystem");
builder.Services.AddDbContext<StudentsContext>(options =>
options.UseSqlServer(connectionString));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
