USE [CJCSM-Inventory]
GO

-- Customers
DECLARE @Customer1Id UNIQUEIDENTIFIER = NEWID(), @Customer2Id UNIQUEIDENTIFIER = NEWID(), @Customer3Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Customer (CustomerId, Name, Address1, City, ProvinceState, Country, PostalCode, Email, IsActive, DateOfCreation, DateOfLastUpdate) VALUES
(@Customer1Id, 'OilCo Energy', '123 Petro St', 'Anytown', 'AB', 'CA', '123456', 'contact@oilcoenergy.com', 1, GETDATE(), GETDATE()),
(@Customer2Id, 'LubeLabs Ltd.', '456 Hydro St', 'Newcity', 'BC', 'CA', '654321', 'info@lubelabs.com', 1, GETDATE(), GETDATE()),
(@Customer3Id, 'FossilFuel Fusion', '789 Fuel Ave', 'Oldtown', 'SK', 'CA', '112233', 'support@fossilfuel.com', 1, GETDATE(), GETDATE());

-- ShopLocation
DECLARE @ShopLocationId UNIQUEIDENTIFIER = NEWID();

INSERT INTO ShopLocation (
    ShopLocationId,
    Name, 
    Address1, 
    Address2, 
    City, 
    ProvinceState, 
    PostalCode, 
    PhoneNumber, 
    FaxNumber, 
    IsActive
) 
VALUES (
    @ShopLocationId,                   -- ShopLocationId
    'Red Deer Shop',                   -- Name
    '123 Main St',                     -- Address1
    'Suite 456',                       -- Address2
    'Red Deer',                        -- City
    'AB',                              -- ProvinceState
    'T2R4F6',                          -- PostalCode
    '(123) 456-7890',                  -- PhoneNumber
    '(123) 456-7891',                  -- FaxNumber
    1                                  -- IsActive
);

-- Racks
DECLARE @Rack1Id UNIQUEIDENTIFIER = NEWID(), @Rack2Id UNIQUEIDENTIFIER = NEWID(), @Rack3Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Rack (RackId, Name, ShopLocationId, JointsPerRack, Description, IsActive) VALUES
(@Rack1Id, 'Rack 1', @ShopLocationId, 70, 'Rack1 Description', 1),
(@Rack2Id, 'Rack 2', @ShopLocationId, 80, 'Rack2 Description', 1),
(@Rack3Id, 'Rack 3', @ShopLocationId, 90, 'Rack3 Description', 1);

-- Tiers
DECLARE @Tier1Id UNIQUEIDENTIFIER = NEWID(), @Tier2Id UNIQUEIDENTIFIER = NEWID(), @Tier3Id UNIQUEIDENTIFIER = NEWID(), 
        @Tier4Id UNIQUEIDENTIFIER = NEWID(), @Tier5Id UNIQUEIDENTIFIER = NEWID(), @Tier6Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Tier (TierId, RackId, Number) VALUES
(@Tier1Id, @Rack1Id, 1),
(@Tier2Id, @Rack1Id, 2),
(@Tier3Id, @Rack2Id, 1),
(@Tier4Id, @Rack2Id, 2),
(@Tier5Id, @Rack3Id, 1),
(@Tier6Id, @Rack3Id, 3);

-- PipeDefinition -- Run PipeDefinitionPropertiesInsertScript.sql first.
DECLARE @PipeDef1Id UNIQUEIDENTIFIER = NEWID(), @PipeDef2Id UNIQUEIDENTIFIER = NEWID(), @PipeDef3Id UNIQUEIDENTIFIER = NEWID(),
        @PipeDef4Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO PipeDefinition (PipeDefinitionId, IsActive, CategoryId, ConditionId, GradeId, RangeId, SizeId, ThreadId, WallId, WeightId)
VALUES 
  (@PipeDef1Id,
   1,  -- Assuming IsActive is set to true by default
   (SELECT TOP 1 PipeProperty_CategoryId FROM PipeProperty_Category ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ConditionId FROM PipeProperty_Condition ORDER BY NEWID()),  
   (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_RangeId FROM PipeProperty_Range ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ThreadID FROM PipeProperty_Thread ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WallId FROM PipeProperty_Wall ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WeightId FROM PipeProperty_Weight ORDER BY NEWID()));

   INSERT INTO PipeDefinition (PipeDefinitionId, IsActive, CategoryId, ConditionId, GradeId, RangeId, SizeId, ThreadId, WallId, WeightId)
VALUES
  (@PipeDef2Id,
   1,  -- Assuming IsActive is set to true by default
   (SELECT TOP 1 PipeProperty_CategoryId FROM PipeProperty_Category ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ConditionId FROM PipeProperty_Condition ORDER BY NEWID()),  
   (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_RangeId FROM PipeProperty_Range ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ThreadID FROM PipeProperty_Thread ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WallId FROM PipeProperty_Wall ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WeightId FROM PipeProperty_Weight ORDER BY NEWID()));

   INSERT INTO PipeDefinition (PipeDefinitionId, IsActive, CategoryId, ConditionId, GradeId, RangeId, SizeId, ThreadId, WallId, WeightId)
VALUES 
  (@PipeDef3Id,
   1,  -- Assuming IsActive is set to true by default
   (SELECT TOP 1 PipeProperty_CategoryId FROM PipeProperty_Category ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ConditionId FROM PipeProperty_Condition ORDER BY NEWID()),  
   (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_RangeId FROM PipeProperty_Range ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ThreadID FROM PipeProperty_Thread ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WallId FROM PipeProperty_Wall ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WeightId FROM PipeProperty_Weight ORDER BY NEWID()));

      INSERT INTO PipeDefinition (PipeDefinitionId, IsActive, CategoryId, ConditionId, GradeId, RangeId, SizeId, ThreadId, WallId, WeightId)
VALUES 
  (@PipeDef4Id,
   1,  -- Assuming IsActive is set to true by default
   (SELECT TOP 1 PipeProperty_CategoryId FROM PipeProperty_Category ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ConditionId FROM PipeProperty_Condition ORDER BY NEWID()),  
   (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_RangeId FROM PipeProperty_Range ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ThreadID FROM PipeProperty_Thread ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WallId FROM PipeProperty_Wall ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WeightId FROM PipeProperty_Weight ORDER BY NEWID()));
   
   -- Pipes (using TierId)
DECLARE @Pipe1Id UNIQUEIDENTIFIER = NEWID(), @Pipe2Id UNIQUEIDENTIFIER = NEWID(), @Pipe3Id UNIQUEIDENTIFIER = NEWID(),
        @Pipe4Id UNIQUEIDENTIFIER = NEWID(), @Pipe5Id UNIQUEIDENTIFIER = NEWID(), @Pipe6Id UNIQUEIDENTIFIER = NEWID(),
        @Pipe7Id UNIQUEIDENTIFIER = NEWID(), @Pipe8Id UNIQUEIDENTIFIER = NEWID(), @Pipe9Id UNIQUEIDENTIFIER = NEWID();

INSERT INTO Pipe (PipeId, PipeDefinitionId, CustomerId, TierId, LengthInMeters, LengthInFeet, Quantity, IndexOfPipe) VALUES
(@Pipe1Id, @PipeDef1Id, @Customer1Id, @Tier1Id, 5.5, 16.4042, 10, 1),
(@Pipe2Id, @PipeDef2Id, @Customer2Id, @Tier2Id, 6.0, 19.6852, 8, 1),
(@Pipe3Id, @PipeDef3Id, @Customer1Id, @Tier3Id, 5.8, 19.0289, 9, 1),
(@Pipe4Id, @PipeDef4Id, @Customer2Id, @Tier4Id, 6.1, 20.0131, 11,1),
(@Pipe5Id, @PipeDef1Id, @Customer2Id, @Tier5Id, 5.9, 19.3579, 7,1),
(@Pipe6Id, @PipeDef3Id, @Customer3Id, @Tier6Id, 6.3, 20.669, 6,1),
(@Pipe7Id, @PipeDef1Id, @Customer1Id, @Tier6Id, 5.9, 19.3579, 7,1),
(@Pipe8Id, @PipeDef1Id, @Customer1Id, @Tier6Id, 5.95, 19.521, 7,2),
(@Pipe9Id, @PipeDef1Id, @Customer1Id, @Tier6Id, 5.85, 19.192, 7,3);

-- Tally
DECLARE @Tally1Id UNIQUEIDENTIFIER = NEWID(), @Tally2Id UNIQUEIDENTIFIER = NEWID(), @Tally3Id UNIQUEIDENTIFIER = NEWID(),
        @TalliedByUserId1 UNIQUEIDENTIFIER = NEWID(), @TalliedByUserId2 UNIQUEIDENTIFIER = NEWID(), @TalliedByUserId3 UNIQUEIDENTIFIER = NEWID();

INSERT INTO Tally (TallyId, CustomerId, ShopLocationId, TallyType, DateOfCreation, Notes, TallyNumber, InvoiceNumber, TalliedByUserId, CarrierName) VALUES
(@Tally1Id, @Customer1Id, @ShopLocationId, 0, GETDATE(), 'Note for Tally 1', 'TN0001', 'INV0001', @TalliedByUserId1, 'Carrier A'),
(@Tally2Id, @Customer2Id, @ShopLocationId, 0, GETDATE(), 'Note for Tally 2', 'TN0002', 'INV0002', @TalliedByUserId2, 'Carrier B'),
(@Tally3Id, @Customer3Id, @ShopLocationId, 1, GETDATE(), 'Note for Tally 3', 'TN0003', 'INV0003', @TalliedByUserId3, 'Carrier C');

-- TallyPipe
INSERT INTO TallyPipe (TallyId, PipeId) VALUES
(@Tally1Id, @Pipe1Id),
(@Tally1Id, @Pipe2Id),
(@Tally2Id, @Pipe3Id),
(@Tally2Id, @Pipe4Id),
(@Tally2Id, @Pipe5Id),
(@Tally2Id, @Pipe6Id),
(@Tally3Id, @Pipe7Id),
(@Tally3Id, @Pipe8Id),
(@Tally3Id, @Pipe9Id);


