using Inventory_API;
using Inventory_BLL.BL;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using System.Reflection;

static IEdmModel GetEdmModel()
{
   ODataConventionModelBuilder builder = new();
   builder.EntitySet<CustomerDto>("Customer");
   builder.EntitySet<RackDto>("Rack");
   return builder.GetEdmModel();
}


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddOData(options => options
        .AddRouteComponents("odata", GetEdmModel())
        .Select()
        .Filter()
        .OrderBy()
        .SetMaxTop(20)
        .Count()
        .Expand()
);

builder.Services.AddDbContext<InventoryContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("defaultConnection")));

builder.Services.AddAutoMapper(Assembly.Load("Inventory-BLL"));

builder.Services.AddScoped<ICustomerBL, CustomerBL>();
builder.Services.AddScoped<IRackBL, RackBL>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Todo: Probably need to update this with actual origins and not allow everything
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
   builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

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
