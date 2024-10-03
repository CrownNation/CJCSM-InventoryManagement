using Inventory_BLL.BL;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using QuestPDF.Infrastructure;
using System.Reflection;
using System.Text.Json.Serialization;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

//Set up QuestPDF license to community in order to generate PDFs
QuestPDF.Settings.License = LicenseType.Community;

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
// Note: There is a naming convention that must exist, whatever you call the EntitySet, a controller with that name must exist. Eg. Customer requires CustomerController.
static IEdmModel GetEdmModel()
{
   ODataConventionModelBuilder builder = new();
   builder.EntitySet<Customer>("Customer");
   builder.EntitySet<Rack>("Rack");
   builder.EntitySet<Tier>("Tier");
   builder.EntitySet<PipeDefinition>("PipeDefinition");
   builder.EntitySet<Pipe>("Pipe");
   builder.EntitySet<Tally>("Tally");
   builder.EntitySet<PipeForTally>("PipeForTally");
   builder.EntitySet<EquipmentForTally>("EquipmentForTally");
   builder.EntitySet<TallyPipe>("TallyPipe");
   builder.EntitySet<ShopLocation>("ShopLocation");
   builder.EntitySet<Equipment>("Equipment");
   builder.EntitySet<EquipmentDefinition>("EquipmentDefinition");
   builder.EntitySet<TallyEquipment>("TallyEquipment");
   builder.EntitySet<PipeProperty_Category>("PipeProperty_Category");
   builder.EntitySet<PipeProperty_Coating>("PipeProperty_Coating");
   builder.EntitySet<PipeProperty_Condition>("PipeProperty_Condition");
   builder.EntitySet<PipeProperty_Grade>("PipeProperty_Grade");
   builder.EntitySet<PipeProperty_Range>("PipeProperty_Range");
   builder.EntitySet<PipeProperty_Size>("PipeProperty_Size");
   builder.EntitySet<PipeProperty_Thread>("PipeProperty_Thread");
   builder.EntitySet<PipeProperty_Wall>("PipeProperty_Wall");
   builder.EntitySet<PipeProperty_Weight>("PipeProperty_Weight");

   return builder.GetEdmModel();
}


//Creates the DI container for the application. A DI Container is a framework for implementing automatic dependency injection.
var builder = WebApplication.CreateBuilder(args);


builder.Configuration.AddJsonFile("appsettings.json"); // Load configuration from appsettings.json

// Load environment-specific configuration
builder.Configuration.AddJsonFile(
   $"appsettings.{builder.Environment.EnvironmentName}.json",
   optional: true,
   reloadOnChange: true);

builder.Configuration.AddEnvironmentVariables();

// Initialize Firebase Admin SDK
FirebaseApp.Create(new AppOptions()
{
   Credential = GoogleCredential.FromFile("cjcsm-test-auth-firebase-adminsdk-frezo-30ff2024df.json")
});

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
string connectionString = builder.Configuration.GetConnectionString("developmentConnection")!;

builder.Services.AddDbContext<InventoryContext>(options =>
   options.UseSqlServer(connectionString, b => b.MigrationsAssembly("Inventory-API"))
   .EnableSensitiveDataLogging(true)
   .LogTo(Console.WriteLine, LogLevel.Information)
   );


// This adds the AutoMapper to the DI container. AutoMapper is a library that maps one object to another.
// Here, we are mapping the DtoCustomer to the CustomerViewModel.
builder.Services.AddAutoMapper(Assembly.Load("Inventory-BLL"));


//builder.Services: This accesses the collection of services that the DI container will manage.
//In the context of dependency injection and service registration, the first type in the <> brackets should typically be an interface
//This is the interface that defines a contract for working with a business logic component related to customers.
//The second type in the <> brackets is the implementation of the interface.


// This method is used to register the service in the DI container with a scoped lifetime which means that a new instance of the service is
// created and shared within the scope of a single HTTP request. This helps ensure that the same instance of the service is used
// throughout the handling of a single request, allowing you to maintain state and data consistency within that scope.
builder.Services.AddScoped<ICustomerBL, CustomerBL>();
builder.Services.AddScoped<IRackBL, RackBL>();
builder.Services.AddScoped<ITierBL, TierBL>();
builder.Services.AddScoped<IPipeDefinitionBL, PipeDefinitionBL>();
builder.Services.AddScoped<IPipeBL, PipeBL>();
builder.Services.AddScoped<ITallyBL, TallyBL>();
builder.Services.AddScoped<IPipeForTallyBL, PipeForTallyBL>();
builder.Services.AddScoped<IEquipmentForTallyBL, EquipmentForTallyBL>();
builder.Services.AddScoped<ITallyPipeBL, TallyPipeBL>();
builder.Services.AddScoped<IShopLocationBL, ShopLocationBL>();
builder.Services.AddScoped<IEquipmentBL, EquipmentBL>();
builder.Services.AddScoped<IEquipmentDefinitionBL, EquipmentDefinitionBL>();
builder.Services.AddScoped<ITallyEquipmentBL, TallyEquipmentBL>();
builder.Services.AddScoped<IPipeProperty_CategoryBL, PipeProperty_CategoryBL>();
builder.Services.AddScoped<IPipeProperty_CoatingBL, PipeProperty_CoatingBL>();
builder.Services.AddScoped<IPipeProperty_ConditionBL, PipeProperty_ConditionBL>();
builder.Services.AddScoped<IPipeProperty_GradeBL, PipeProperty_GradeBL>();
builder.Services.AddScoped<IPipeProperty_RangeBL, PipeProperty_RangeBL>();
builder.Services.AddScoped<IPipeProperty_SizeBL, PipeProperty_SizeBL>();
builder.Services.AddScoped<IPipeProperty_ThreadBL, PipeProperty_ThreadBL>();
builder.Services.AddScoped<IPipeProperty_WallBL, PipeProperty_WallBL>();
builder.Services.AddScoped<IPipeProperty_WeightBL, PipeProperty_WeightBL>();
builder.Services.AddScoped<IPipePropertiesBL, PipePropertiesBL>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// This method adds metadata about your API's endpoints to the ASP.NET Core application. It doesn't directly generate human-readable
// documentation like Swagger UI. Instead, it creates structured information that other tools, like Swagger, can use to generate documentation.
// This metadata includes details about routes, HTTP methods, parameters, and more.
builder.Services.AddEndpointsApiExplorer();
// This method specifically enables the generation of Swagger documentation, which is an interactive and user-friendly way to explore and understand
// your API. Swagger UI is a web-based interface that displays your API's endpoints, methods, parameters, request and response formats, and
// other details. It uses the metadata generated by AddEndpointsApiExplorer() to create this interactive documentation.
builder.Services.AddSwaggerGen();

//Add ability for json serializer to convert strings to enums for incoming requests
builder.Services.AddControllers().AddJsonOptions(options =>
{
   options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
   options.JsonSerializerOptions.PropertyNameCaseInsensitive = true; // Optionally, make property names case-insensitive
});

Console.WriteLine("....................................................");
Console.WriteLine($"OUR Environment: {builder.Environment.EnvironmentName}");
Console.WriteLine("....................................................");

// Configure CORS policies. Browsers won't let you make AJAX requests to a different domain unless that domain has CORS enabled.
// So we set up which domains we can make requests to.
if (builder.Environment.IsDevelopment())
{
   builder.Services.AddCors(options =>
   {
      options.AddPolicy("DevCorsPolicy", builder =>
       {
          builder.AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader();
       });
   });
   builder.Configuration["EnvironmentName"] = "Develolpment";
}
else if (builder.Environment.EnvironmentName == "Test")
{
   builder.Services.AddCors(options =>
   {
      options.AddPolicy("TestCorsPolicy", builder =>
      {
         //builder.WithOrigins(
         //     "https://cjcsm-tally-test.webp.app",
         //     "https://cjcsm-tally-test.firebaseapp.com"
         // )
         builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
      });
   });
   builder.Configuration["EnvironmentName"] = "Test";
}
else
{
   builder.Services.AddCors(options =>
   {
      options.AddPolicy("ProdCorsPolicy", builder =>
       {
          builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
       });
      builder.Configuration["EnvironmentName"] = "Production";

   });

}


//// Authentication
//string firebaseAuthorityUrl = builder.Configuration["AppSettings:FirebaseAuthorityUrl"] ?? throw new ArgumentNullException("FirebaseAuthorityUrl is not set in the configuration");
//string firebaseAppId = builder.Configuration["AppSettings:FirebaseAppId"] ?? throw new ArgumentNullException("FirebaseAppId is not set in the configuration");



//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
//{
//   options.Authority = firebaseAuthorityUrl;
//   options.TokenValidationParameters = new TokenValidationParameters
//   {
//      ValidateIssuer = true,
//      ValidIssuer = firebaseAuthorityUrl,
//      ValidateAudience = true,
//      ValidAudience = firebaseAppId,
//      ValidateLifetime = true
//   };
//});

// Firebase Authentication - Add JWT Bearer authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
       options.Authority = "https://securetoken.google.com/cjcsm-test-auth";
       options.TokenValidationParameters = new TokenValidationParameters
       {
          ValidateIssuer = true,
          ValidIssuer = "https://securetoken.google.com/cjcsm-test-auth",
          ValidateAudience = true,
          ValidAudience = "cjcsm-test-auth",
          ValidateLifetime = true
       };

       // Custom token validation to handle Firebase-specific validations
       options.Events = new JwtBearerEvents
       {
          OnMessageReceived = context =>
          {
             // Retrieve token from the Authorization header (or custom header if necessary)
             var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
             if (!string.IsNullOrEmpty(token))
             {
                context.Token = token;
                System.Diagnostics.Debug.WriteLine($"Token: {token}");
             }
             return Task.CompletedTask;
          },
          OnAuthenticationFailed = context =>
          {
             System.Diagnostics.Debug.WriteLine($"AUTHENTICATION FAILED");

             // Handle authentication failure here
             return Task.CompletedTask;
          },
          OnTokenValidated = context =>
          {
             System.Diagnostics.Debug.WriteLine($"VALIDATED");

             // Additional custom token validation can be added here
             return Task.CompletedTask;
          }
       };
    });



//System.Diagnostics.Debug.WriteLine("....................................................");
//System.Diagnostics.Debug.WriteLine($"FirebaseAuthorityUrl: {firebaseAuthorityUrl}");
//System.Diagnostics.Debug.WriteLine($"FirebaseAppId: {firebaseAppId}");
//System.Diagnostics.Debug.WriteLine("....................................................");


// This method is used to create a new instance of the application's host. The host is responsible for app startup and lifetime management.
var app = builder.Build();



if (app.Environment.IsDevelopment())
{
   app.UseSwagger();
   app.UseSwaggerUI();
}

// This is redirects HTTP requests to HTTPS requests. This is a security best practice
app.UseHttpsRedirection();

//Set the cors policy based on the environment
//app.Environment.IsDevelopment() is true when the app is running in the debug mode.
//app.Environment.IsDevelopment() is false when environment variable DOTNET_ENVIRONMENT=Production is set to Production on the server.
if (app.Environment.IsDevelopment())
{
   app.UseCors("DevCorsPolicy");
}
else if (app.Environment.EnvironmentName == "Test")
{
   app.UseCors("TestCorsPolicy");
}
else
{
   app.UseCors("ProdCorsPolicy");
}

// This is responsible for enforcing authorization policies on incoming requests. It checks whether the authenticated user is authorized
// to access the requested resource or perform the requested action. Authorization determines what a user is allowed to do after they have
// been authenticated
//
// NOTE: UseAuthentication() HAS TO HAPPEN BEFORE UserAuthorization() or you will get 401 authentication failed.
app.UseAuthentication();

app.UseAuthorization();

// The app.MapControllers(); method is used to map incoming HTTP requests to the appropriate controller actions in an ASP.NET Core application.
// It's a part of the request processing pipeline and serves as a central point for routing requests to controllers based on the URL and HTTP
// verb (GET, POST, PUT, DELETE, etc.).
// When a request reaches this point in the middleware pipeline, ASP.NET Core examines the URL and determines which controller and action
// method should handle the request.
// Eg. URL: https://api.example.com/Customer/{customerId}
// Method: GET
// Maps to: Get action method in CustomerController with a parameter named key (customerId)
app.MapControllers();

// ** Modify the app to listen on the port specified by the PORT environment variable **
if (builder.Environment.EnvironmentName == "Test")
{
   var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
   app.Urls.Add($"http://0.0.0.0:{port}");
}

// This starts the application and begins listening for requests.
app.Run();

