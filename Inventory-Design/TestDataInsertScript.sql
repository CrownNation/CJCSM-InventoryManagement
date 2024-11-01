USE [CJCSM-Inventory]

-- Customers
DECLARE @Customer1Id UNIQUEIDENTIFIER = '88E14C54-67C8-4D0D-92B8-3D74A77DEE9A',
        @Customer2Id UNIQUEIDENTIFIER = '72A8A85A-7B5E-480D-9A8D-5D5A2400E1C6',
        @Customer3Id UNIQUEIDENTIFIER = '0BBA1231-F0C3-4B32-8742-617EB80CDEAD';

INSERT INTO Customer (CustomerId, Name, Address1, City, ProvinceState, Country, PostalCode, Email, IsActive, DateOfCreation, DateOfLastUpdate) VALUES
(@Customer1Id, 'OilCo Energy', '123 Petro St', 'Anytown', 'AB', 'CA', '123456', 'contact@oilcoenergy.com', 1, GETDATE(), GETDATE()),
(@Customer2Id, 'LubeLabs Ltd.', '456 Hydro St', 'Newcity', 'BC', 'CA', '654321', 'info@lubelabs.com', 1, GETDATE(), GETDATE()),
(@Customer3Id, 'FossilFuel Fusion', '789 Fuel Ave', 'Oldtown', 'SK', 'CA', '112233', 'support@fossilfuel.com', 1, GETDATE(), GETDATE());

-- ShopLocation
DECLARE @ShopLocationId UNIQUEIDENTIFIER = 'E2B0A76F-60D4-40D6-BD3D-761F55029EDF';

INSERT INTO ShopLocation (
    ShopLocationId,
    Name, 
    Address1, 
    Address2,
    City,
    Country,
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
    'CA',                              -- Country
    'AB',                              -- ProvinceState
    'T2R4F6',                          -- PostalCode
    '(123) 456-7890',                  -- PhoneNumber
    '(123) 456-7891',                  -- FaxNumber
    1                                  -- IsActive
);

-- Racks
DECLARE @Rack1Id UNIQUEIDENTIFIER = '4D7F90B7-A964-4BAA-8B52-6241A72E4DDA',
        @Rack2Id UNIQUEIDENTIFIER = 'E44FD154-091F-43A1-BA5A-071ABD2B3694',
        @Rack3Id UNIQUEIDENTIFIER = 'B3CFC44C-879B-43EF-B6F0-02FA0D232430';

INSERT INTO Rack (RackId, Name, ShopLocationId, JointsPerTier, Description, IsActive) VALUES
(@Rack1Id, 'Rack 1', @ShopLocationId, 70, 'Rack1 Description', 1),
(@Rack2Id, 'Rack 2', @ShopLocationId, 80, 'Rack2 Description', 1),
(@Rack3Id, 'Rack 3', @ShopLocationId, 90, 'Rack3 Description', 1);

-- Tiers
DECLARE @Tier1Id UNIQUEIDENTIFIER = 'F47E160F-B7C8-49B2-99B1-3E21BAA66F37',
        @Tier2Id UNIQUEIDENTIFIER = '5A866C8C-7DBE-4F18-92C5-824D5A23C940',
        @Tier3Id UNIQUEIDENTIFIER = '1EAA9661-25A8-4EFD-9F7A-272D15A1F820',
        @Tier4Id UNIQUEIDENTIFIER = '3F6F1EAF-4B35-4A64-91B5-04A3ED2676F4',
        @Tier5Id UNIQUEIDENTIFIER = 'AC5FDC4F-0971-4083-A232-DC9F41106EDB',
        @Tier6Id UNIQUEIDENTIFIER = 'B88C71C1-FAB1-4F66-84AA-C7A46056EF32';

INSERT INTO Tier (TierId, RackId, Number) VALUES
(@Tier1Id, @Rack1Id, 1),
(@Tier2Id, @Rack1Id, 2),
(@Tier3Id, @Rack1Id, 3),
(@Tier4Id, @Rack2Id, 1),
(@Tier5Id, @Rack2Id, 2),
(@Tier6Id, @Rack3Id, 1);

-- Extra empty Tiers --
INSERT INTO Tier (TierId, RackId, Number) VALUES
('fb1ea2da-102f-4f45-a631-da3278c0e407', '4D7F90B7-A964-4BAA-8B52-6241A72E4DDA', 4),
('4a14b12d-dce7-4854-a0fa-976aa8190aa1', '4D7F90B7-A964-4BAA-8B52-6241A72E4DDA', 5),
('d2caf989-6832-4fc7-b10f-9713f79ed95b', 'E44FD154-091F-43A1-BA5A-071ABD2B3694', 3),
('982c9462-5cb6-410f-b801-6f688bf23ca1', 'E44FD154-091F-43A1-BA5A-071ABD2B3694', 4),
('72bd176b-a811-42ae-a9a1-5d1611a41c47', 'E44FD154-091F-43A1-BA5A-071ABD2B3694', 5),
('85daae36-7bff-43c0-b404-08ed28978ae0', 'B3CFC44C-879B-43EF-B6F0-02FA0D232430', 2),
('eee43e89-064c-4977-ad6c-fb6a79047670', 'B3CFC44C-879B-43EF-B6F0-02FA0D232430', 3),
('0e5b6ff3-2d46-4623-9392-287d35c28e6d', 'B3CFC44C-879B-43EF-B6F0-02FA0D232430', 4),
('6139361f-c06f-4334-b919-b81b37bcae41', 'B3CFC44C-879B-43EF-B6F0-02FA0D232430', 5);

-- PipeDefinition -- Run PipeDefinitionPropertiesInsertScript.sql first.
DECLARE @PipeDef1Id UNIQUEIDENTIFIER = 'B06E0CCD-5E02-41C4-95A7-5F36F2A81A14',
        @PipeDef2Id UNIQUEIDENTIFIER = 'AA97E729-0E1F-4A08-82DE-C5A3A04A0ABD',
        @PipeDef3Id UNIQUEIDENTIFIER = 'EAF46425-5310-43C3-BD58-2F6CC79F6017',
        @PipeDef4Id UNIQUEIDENTIFIER = 'D4386745-AE36-4C20-8A1D-16DA6B727A9B';

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
DECLARE @Pipe1Id UNIQUEIDENTIFIER = '8E215C3E-33C1-41C8-A6F1-ED1C1F651935', 
        @Pipe2Id UNIQUEIDENTIFIER = '2A9B66C1-5713-429C-8E48-35A0D3EF1F08', 
        @Pipe3Id UNIQUEIDENTIFIER = '1FACCC15-F929-4B26-8969-5EF51E60B340', 
        @Pipe4Id UNIQUEIDENTIFIER = 'BE96C692-0A36-47A5-9AB3-548CF9EF3280', 
        @Pipe5Id UNIQUEIDENTIFIER = 'D2A7C9A9-0B19-4A8E-A60B-5B5CFD07E89E', 
        @Pipe6Id UNIQUEIDENTIFIER = 'D83D4DB7-4E71-46AC-80AD-C8E2073B2072', 
        @Pipe7Id UNIQUEIDENTIFIER = '46FFCF45-4000-47F2-A06D-82B9BDC4E8AB', 
        @Pipe8Id UNIQUEIDENTIFIER = '752C1286-61B7-4A19-A481-0D63492976BF', 
        @Pipe9Id UNIQUEIDENTIFIER = 'D8E4C6BC-BAC7-4570-BE94-5579F35B192D';

INSERT INTO Pipe (PipeId, PipeDefinitionId, CustomerId, TierId, LengthInMeters, LengthInFeet, Quantity, IndexOfPipe) VALUES
(@Pipe1Id, @PipeDef1Id, @Customer1Id, @Tier1Id, 5.5, 16.4042, 10, 1),
(@Pipe2Id, @PipeDef2Id, @Customer2Id, @Tier2Id, 6.0, 19.6852, 8, 1),
(@Pipe3Id, @PipeDef3Id, @Customer1Id, @Tier3Id, 5.8, 19.0289, 9, 1),
(@Pipe4Id, @PipeDef4Id, @Customer2Id, @Tier4Id, 6.1, 20.0131, 11,1),
(@Pipe5Id, @PipeDef1Id, @Customer2Id, @Tier5Id, 5.9, 19.3579, 7,1),
(@Pipe6Id, @PipeDef3Id, @Customer3Id, @Tier6Id, 6.3, 20.669, 6,1),
(@Pipe7Id, @PipeDef1Id, @Customer3Id, @Tier6Id, 5.9, 19.3579, 7,1),
(@Pipe8Id, @PipeDef1Id, @Customer3Id, @Tier6Id, 5.95, 19.521, 7,2),
(@Pipe9Id, @PipeDef1Id, @Customer3Id, @Tier6Id, 5.85, 19.192, 7,3);

-- Tally
DECLARE @Tally1Id UNIQUEIDENTIFIER = '96fb53a5-a421-488c-b725-d77c16b1a9f9',
        @Tally2Id UNIQUEIDENTIFIER = 'DEAB8BFD-FC9E-4D6A-AB69-FBF3A4D37012',
        @Tally3Id UNIQUEIDENTIFIER = 'F7FD085A-490A-4A27-AF4A-8B61A76E0A4E', 
        @TalliedByUserId1 UNIQUEIDENTIFIER = '4EAB6D23-A723-47F9-8103-9381E6323CC1', 
        @TalliedByUserId2 UNIQUEIDENTIFIER = '7D69E3F6-0C82-4A8D-A3D5-C7B6A0A9B6A9',
        @TalliedByUserId3 UNIQUEIDENTIFIER = 'b4d8b4a5-9b34-4376-ad19-dcceac4ea62a';

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

GO
