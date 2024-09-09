# Use the .NET 6.0 SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy the solution file
COPY *.sln ./

# Copy all the project files required for the solution
COPY Inventory-API/Inventory-API.csproj ./Inventory-API/
COPY Inventory-BLL/Inventory-BLL.csproj ./Inventory-BLL/
COPY Inventory-Models/Inventory-Models.csproj ./Inventory-Models/
COPY Inventory-DAL/Inventory-DAL.csproj ./Inventory-DAL/
COPY Inventory-Tests/Inventory-Tests.csproj ./Inventory-Tests/
COPY CJCSM-Common/CJCSM-Common.csproj ./CJCSM-Common/
COPY Inventory-Documents/Inventory-Documents.csproj ./Inventory-Documents/

# Restore dependencies for the entire solution
RUN dotnet restore


# Copy all files from the solution folder into the container
COPY . .

# Set the working directory to the project you want to build and publish
WORKDIR /src/Inventory-API
RUN dotnet publish -c Release -o /app/out

# Use the .NET 6.0 runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app


COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "Inventory-API.dll"]
