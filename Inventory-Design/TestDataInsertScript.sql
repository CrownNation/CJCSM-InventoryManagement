-- Customers
DECLARE @Customer1Id UNIQUEIDENTIFIER = NEWID(), @Customer2Id UNIQUEIDENTIFIER = NEWID(), @Customer3Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Customer (CustomerId, Name, Address1, City, ProvinceState, PostalCode, Email, IsActive, DateOfCreation, DateOfLastUpdate) VALUES
(@Customer1Id, 'OilCo Energy', '123 Petro St', 'Anytown', 'AB', '123456', 'contact@oilcoenergy.com', 1, GETDATE(), GETDATE()),
(@Customer2Id, 'LubeLabs Ltd.', '456 Hydro St', 'Newcity', 'BC', '654321', 'info@lubelabs.com', 1, GETDATE(), GETDATE()),
(@Customer3Id, 'FossilFuel Fusion', '789 Fuel Ave', 'Oldtown', 'CA', '112233', 'support@fossilfuel.com', 1, GETDATE(), GETDATE());

-- Racks
DECLARE @Rack1Id UNIQUEIDENTIFIER = NEWID(), @Rack2Id UNIQUEIDENTIFIER = NEWID(), @Rack3Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Rack (RackId, Name, ShopLocationId, IsActive) VALUES
(@Rack1Id, 'Rack 1', NEWID(), 1),
(@Rack2Id, 'Rack 2', NEWID(), 1),
(@Rack3Id, 'Rack 3', NEWID(), 1);

-- Tiers
DECLARE @Tier1Id UNIQUEIDENTIFIER = NEWID(), @Tier2Id UNIQUEIDENTIFIER = NEWID(), @Tier3Id UNIQUEIDENTIFIER = NEWID(), 
        @Tier4Id UNIQUEIDENTIFIER = NEWID(), @Tier5Id UNIQUEIDENTIFIER = NEWID(), @Tier6Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Tier (TierId, RackId, Number) VALUES
(@Tier1Id, @Rack1Id, 1),
(@Tier2Id, @Rack1Id, 2),
(@Tier3Id, @Rack2Id, 1),
(@Tier4Id, @Rack2Id, 2),
(@Tier5Id, @Rack3Id, 1);

-- Sections
DECLARE @Section1Id UNIQUEIDENTIFIER = NEWID(), @Section2Id UNIQUEIDENTIFIER = NEWID(), @Section3Id UNIQUEIDENTIFIER = NEWID(),
        @Section4Id UNIQUEIDENTIFIER = NEWID(), @Section5Id UNIQUEIDENTIFIER = NEWID(), @Section6Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Section (SectionId, TierId, CustomerId) VALUES
(@Section1Id, @Tier1Id, @Customer1Id),
(@Section2Id, @Tier2Id, @Customer1Id),
(@Section3Id, @Tier3Id, @Customer2Id),
(@Section4Id, @Tier4Id, @Customer2Id),
(@Section5Id, @Tier5Id, @Customer3Id),
(@Section6Id, @Tier5Id, @Customer3Id);

-- PipeDefinition
DECLARE @PipeDef1Id UNIQUEIDENTIFIER = NEWID(), @PipeDef2Id UNIQUEIDENTIFIER = NEWID(), @PipeDef3Id UNIQUEIDENTIFIER = NEWID(), @PipeDef4Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO PipeDefinition (PipeDefinitionId, PipeSizeId, PipeConditionId, PipeThreadId, PipeGradeId, PipeCoatingId, Weight, WallSizeMetric, IsActive) 
VALUES 
(@PipeDef1Id, NEWID(), NEWID(), NEWID(), NEWID(), NEWID(), 15.5, 6.8, 1),
(@PipeDef2Id, NEWID(), NEWID(), NEWID(), NEWID(), NEWID(), 16.2, 7.1, 1),
(@PipeDef3Id, NEWID(), NEWID(), NEWID(), NEWID(), NEWID(), 15.9, 7.0, 1),
(@PipeDef4Id, NEWID(), NEWID(), NEWID(), NEWID(), NEWID(), 15.7, 6.9, 1);

-- Pipes
DECLARE @Pipe1Id UNIQUEIDENTIFIER = NEWID(), @Pipe2Id UNIQUEIDENTIFIER = NEWID(), @Pipe3Id UNIQUEIDENTIFIER = NEWID(),
        @Pipe4Id UNIQUEIDENTIFIER = NEWID(), @Pipe5Id UNIQUEIDENTIFIER = NEWID(), @Pipe6Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Pipe (PipeId, PipeDefinitionId, SectionId, Length, Quantity) VALUES
(@Pipe1Id, @PipeDef1Id, @Section1Id, 5.5, 10),
(@Pipe2Id, @PipeDef2Id, @Section2Id, 6.0, 8),
(@Pipe3Id, @PipeDef3Id, @Section3Id, 5.8, 9),
(@Pipe4Id, @PipeDef4Id, @Section4Id, 6.1, 11),
(@Pipe5Id, @PipeDef1Id, @Section5Id, 5.9, 7),
(@Pipe6Id, @PipeDef3Id, @Section6Id, 6.3, 6);

-- Tally
DECLARE @Tally1Id UNIQUEIDENTIFIER = NEWID(), @Tally2Id UNIQUEIDENTIFIER = NEWID(), @Tally3Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Tally (TallyId, CustomerId, ShopLocationId, TallyType, DateOfCreation) VALUES
(@Tally1Id, @Customer1Id, NEWID(), 1, GETDATE()),
(@Tally2Id, @Customer2Id, NEWID(), 2, GETDATE()),
(@Tally3Id, @Customer3Id, NEWID(), 3, GETDATE());

-- TallyPipe
INSERT INTO TallyPipe (TallyId, PipeId) VALUES
(@Tally1Id, @Pipe1Id),
(@Tally1Id, @Pipe2Id),
(@Tally2Id, @Pipe3Id),
(@Tally2Id, @Pipe4Id),
(@Tally3Id, @Pipe5Id),
(@Tally3Id, @Pipe6Id);
