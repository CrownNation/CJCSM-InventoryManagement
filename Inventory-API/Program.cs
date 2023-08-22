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

// Program.cs in .Net Core 6.0+ is the entry point for the application that 
// It implies using System;
// It also implies that everything in here is in Main()
// On startup, ASP.NET Core apps configure and launch a host by using the code in Program.cs
// You can think of a host as a wrapper around your application. It is responsible for the startup and lifetime management of the application.
// The host contains the application configuration and the Kestrel server (an HTTP server) that listens for requests and sends responses.
// It also sets up the logging, dependency injection, configuration, request processing pipeline, etc.

// This is a method call that returns the Entity Data Model (EDM) for your OData API.
// The EDM is a conceptual model that represents the structure of your data and the relationships between entities (tables) in your API.
// It defines how data is organized, what entities exist, and how they can be queried and manipulated.
// This provides OData with the necessary information about the structure of your API's data.
// This information is used by OData to generate the appropriate routes, endpoints, and query options for your API.
static IEdmModel GetEdmModel()
{
   ODataConventionModelBuilder builder = new();
   builder.EntitySet<DtoCustomer>("Customer");
   return builder.GetEdmModel();
}


//Creates the DI container for the application. A DI Container is a framework for implementing automatic dependency injection.
var builder = WebApplication.CreateBuilder(args);

// Add services to the container. A service is a reusable component that provides app functionality.
// Services are registered in the app's DI container and then consumed throughout the app.
// Anything registered here is injected into constructors that declare a parameter of the same type. You can also use method injection.
// AddRouteComponents() is a method that adds the OData route components to the OData service. 
// The .Select(), etc are option flags to enable OData functionality for different query types.
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

//Adds the DbContext to the DI container. The DbContext is the main class that is responsible for interacting with the database.
//<InventoryContext>: This specifies the type of the database context you're adding to the container.
//options.UseSqlServer(...): This method is part of Entity Framework's API and configures the database provider to be used.
//In this case, you're configuring it to use SQL Server as the database provider.
//builder.Configuration.GetConnectionString("defaultConnection"): This gets the connection string from the appsettings.json file.
//This injects the context to allow access to the database  that has the structure defined in InventoryContext 
//into any place in the application that requires the functionality to read and write data to the database.
builder.Services.AddDbContext<InventoryContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("defaultConnection")));

// This adds the AutoMapper to the DI container. AutoMapper is a library that maps one object to another.
// Here, we are mapping the DtoCustomer to the CustomerViewModel.
builder.Services.AddAutoMapper(Assembly.Load("Inventory-BLL"));

builder.Services.AddScoped<ICustomerBL, CustomerBL>();
builder.Services.AddScoped<IRackBL, RackBL>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Todo: Probably need to update this with actual origins and not allow everything
//builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
//{
//   builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
//}));

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
