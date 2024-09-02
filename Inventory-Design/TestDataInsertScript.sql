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
        @Rack3Id UNIQUEIDENTIFIER = 'B3CFC44C-879B-43EF-B6F0-02FA0D232430',
        @Rack4Id UNIQUEIDENTIFIER = '2a8cefdc-6181-4749-b9f6-f890ce90eea4',
        @Rack5Id UNIQUEIDENTIFIER = '0e0a856a-bbac-49b4-a67d-825f38e4aef7';

INSERT INTO Rack (RackId, Name, RackType, ShopLocationId, JointsPerTier, Description, IsActive) VALUES
(@Rack1Id, 'Rack 1', 'Pipe', @ShopLocationId, 70, 'Rack1 Description', 1),
(@Rack2Id, 'Rack 2', 'Pipe',@ShopLocationId, 80, 'Rack2 Description', 1),
(@Rack3Id, 'Rack 3', 'Pipe', @ShopLocationId, 90, 'Rack3 Description', 1),
(@Rack4Id, 'Rack 4 Equipment 1', 'Equipment', @ShopLocationId, 100, 'For Equipment', 1),
(@Rack5Id, 'Rack 5 Equipment 2', 'Equipment', @ShopLocationId, 100, 'For Equipment', 1);

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

INSERT INTO PipeDefinition (PipeDefinitionId, IsActive, CategoryId, CoatingId, ConditionId, GradeId, RangeId, SizeId, ThreadId, WallId, WeightId)
VALUES 
  (@PipeDef1Id,
   1,  -- Assuming IsActive is set to true by default
   (SELECT TOP 1 PipeProperty_CategoryId FROM PipeProperty_Category ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_CoatingId FROM PipeProperty_Coating ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ConditionId FROM PipeProperty_Condition ORDER BY NEWID()),  
   (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_RangeId FROM PipeProperty_Range ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ThreadID FROM PipeProperty_Thread ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WallId FROM PipeProperty_Wall ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WeightId FROM PipeProperty_Weight ORDER BY NEWID()));

INSERT INTO PipeDefinition (PipeDefinitionId, IsActive, CategoryId, CoatingId, ConditionId, GradeId, RangeId, SizeId, ThreadId, WallId, WeightId)
VALUES
  (@PipeDef2Id,
   1,  -- Assuming IsActive is set to true by default
   (SELECT TOP 1 PipeProperty_CategoryId FROM PipeProperty_Category ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_CoatingId FROM PipeProperty_Coating ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ConditionId FROM PipeProperty_Condition ORDER BY NEWID()),  
   (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_RangeId FROM PipeProperty_Range ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ThreadID FROM PipeProperty_Thread ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WallId FROM PipeProperty_Wall ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WeightId FROM PipeProperty_Weight ORDER BY NEWID()));

INSERT INTO PipeDefinition (PipeDefinitionId, IsActive, CategoryId, CoatingId, ConditionId, GradeId, RangeId, SizeId, ThreadId, WallId, WeightId)
VALUES 
  (@PipeDef3Id,
   1,  -- Assuming IsActive is set to true by default
   (SELECT TOP 1 PipeProperty_CategoryId FROM PipeProperty_Category ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_CoatingId FROM PipeProperty_Coating ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ConditionId FROM PipeProperty_Condition ORDER BY NEWID()),  
   (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_RangeId FROM PipeProperty_Range ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_ThreadID FROM PipeProperty_Thread ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WallId FROM PipeProperty_Wall ORDER BY NEWID()),
   (SELECT TOP 1 PipeProperty_WeightId FROM PipeProperty_Weight ORDER BY NEWID()));

INSERT INTO PipeDefinition (PipeDefinitionId, IsActive, CategoryId, CoatingId, ConditionId, GradeId, RangeId, SizeId, ThreadId, WallId, WeightId)
VALUES 
  (@PipeDef4Id,
   1,  -- Assuming IsActive is set to true by default
   (SELECT TOP 1 PipeProperty_CategoryId FROM PipeProperty_Category ORDER BY NEWID()),
      (SELECT TOP 1 PipeProperty_CoatingId FROM PipeProperty_Coating ORDER BY NEWID()),
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
(@Pipe6Id, @PipeDef3Id, @Customer3Id, @Tier5Id, 6.3, 20.669, 6,8),
(@Pipe7Id, @PipeDef1Id, @Customer3Id, @Tier6Id, 5.85, 19.3579, 7,1),
(@Pipe8Id, @PipeDef1Id, @Customer3Id, @Tier6Id, 5.9, 19.521, 7,8),
(@Pipe9Id, @PipeDef1Id, @Customer3Id, @Tier6Id, 5.95, 19.192, 7,15);


-- Equipment
DECLARE @EquipmentDef1Id UNIQUEIDENTIFIER = '1512b3e7-c5dc-4720-a9c8-5b3f13138196',
        @EquipmentDef2Id UNIQUEIDENTIFIER = 'c313ddb4-3f62-43fa-a3aa-48d1bc26d6fc',
        @EquipmentDef3Id UNIQUEIDENTIFIER = 'b00aea53-b5f4-4880-bf69-50d9c847cea3',
        @EquipmentDef4Id UNIQUEIDENTIFIER = '953880a2-4966-431a-8b0a-6e2e066a31a9';

INSERT INTO EquipmentDefinition (EquipmentDefinitionId, IsActive, Description, Category, GradeId, SizeId, Notes) 
VALUES 
(@EquipmentDef1Id, 1, 'Description of item', 'PupJoint', (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()), (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()), 'Notes go here'),
(@EquipmentDef2Id, 1, 'Description of item', 'Collar', (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()), (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()), 'Notes go here'),
(@EquipmentDef3Id, 1, 'Description of item', 'StabbingGuide', (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()), (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()), 'Notes go here'),
(@EquipmentDef4Id, 1, 'Description of item', 'Drift', (SELECT TOP 1 PipeProperty_GradeId FROM PipeProperty_Grade ORDER BY NEWID()), (SELECT TOP 1 PipeProperty_SizeId FROM PipeProperty_Size ORDER BY NEWID()), 'Notes go here');

DECLARE @Equipment1Id UNIQUEIDENTIFIER = 'dc245cb7-7497-4535-b558-9f9e097b939b',
		@Equipment2Id UNIQUEIDENTIFIER = 'd814be6e-bc42-446c-af1b-17750ef5dcb1',
		@Equipment3Id UNIQUEIDENTIFIER = '582cd453-25af-4064-a415-9fa47fbadbf8',
		@Equipment4Id UNIQUEIDENTIFIER = '09815875-c0a8-4335-8c0b-a672d220aa0d',
		@Equipment5Id UNIQUEIDENTIFIER = '54b12ebf-8105-485d-aa9d-71a63333d223',
		@Equipment6Id UNIQUEIDENTIFIER = '540f74b5-85ca-46c5-b155-8060b7ae50ad';
		
		
INSERT INTO Equipment (EquipmentId, RackId, EquipmentDefinitionId, CustomerId, Quantity, LengthInMeters, LengthInFeet) 
VALUES 
(@Equipment1Id, @Rack4Id, @EquipmentDef1Id, @Customer1Id, 10, 100.0, 328.084),
(@Equipment2Id, @Rack4Id, @EquipmentDef2Id, @Customer1Id, 5, 10.0, 150.084),
(@Equipment3Id, @Rack5Id, @EquipmentDef3Id, @Customer2Id, 10, 100.0, 328.084),
(@Equipment4Id, @Rack5Id, @EquipmentDef4Id, @Customer1Id, 10, 100.0, 328.084),
(@Equipment5Id, @Rack5Id, @EquipmentDef1Id, @Customer3Id, 10, 100.0, 328.084),
(@Equipment6Id, @Rack5Id, @EquipmentDef2Id, @Customer1Id, 10, 100.0, 328.084);
		
		
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

-- TallyEquipment
INSERT INTO TallyEquipment (TallyId, EquipmentId) VALUES
(@Tally1Id, @Equipment1Id),
(@Tally1Id, @Equipment2Id),
(@Tally1Id, @Equipment3Id),
(@Tally2Id, @Equipment1Id),
(@Tally2Id, @Equipment2Id),
(@Tally3Id, @Equipment4Id);


-- Pipe for Tally
DECLARE @PipeForTally1Id UNIQUEIDENTIFIER = '6AB0D5F9-173F-4A6F-9B23-84C8B6F5D2A6';
DECLARE @PipeForTally2Id UNIQUEIDENTIFIER = 'A93FD1C5-6A76-41AC-9A52-EEB8B47357A9';
DECLARE @PipeForTally3Id UNIQUEIDENTIFIER = 'D58A93B1-8D8A-4A6E-A2A6-F3BB47E789BB';
DECLARE @PipeForTally4Id UNIQUEIDENTIFIER = '8DBEBD2C-627E-4A9A-9D5B-6A36B23BC7D1';
DECLARE @PipeForTally5Id UNIQUEIDENTIFIER = 'B7AEB91D-3A87-4F9E-A7A6-51AC74D9BBF3';
DECLARE @PipeForTally6Id UNIQUEIDENTIFIER = '2B3F1A2D-6F89-4C6E-8A36-5B7E84F9C8A6';
DECLARE @PipeForTally7Id UNIQUEIDENTIFIER = '5F7C82A3-9D8A-4A6F-B1A7-84C6F8A39B47';
DECLARE @PipeForTally8Id UNIQUEIDENTIFIER = '7A3B29C5-3A87-4A9A-8D7B-9F8B62D3C8B1';
DECLARE @PipeForTally9Id UNIQUEIDENTIFIER = '9F8C7B6D-2A6E-4A7B-8D9A-6F3B9A8A7A2D';

INSERT INTO PipeForTally (PipeForTallyId, TallyId, PipeDefinitionId, CustomerId, TierId, LengthInMeters, Quantity, IndexOfPipe) VALUES
(@PipeForTally1Id, @Tally1Id, @PipeDef1Id, @Customer1Id, @Tier1Id, 5.5, 10, 1),
(@PipeForTally2Id, @Tally1Id, @PipeDef2Id, @Customer2Id, @Tier2Id, 6.0, 8, 1),
(@PipeForTally3Id, @Tally2Id, @PipeDef3Id, @Customer1Id, @Tier3Id, 5.8, 9, 1),
(@PipeForTally4Id, @Tally2Id, @PipeDef4Id, @Customer2Id, @Tier4Id, 6.1, 11, 1),
(@PipeForTally5Id, @Tally2Id, @PipeDef1Id, @Customer2Id, @Tier5Id, 5.9, 7, 1),
(@PipeForTally6Id, @Tally2Id, @PipeDef3Id, @Customer3Id, @Tier5Id, 6.3, 6, 8),
(@PipeForTally7Id, @Tally3Id, @PipeDef1Id, @Customer3Id, @Tier6Id, 5.85, 7, 1),
(@PipeForTally8Id, @Tally3Id, @PipeDef1Id, @Customer3Id, @Tier6Id, 5.9, 7, 8),
(@PipeForTally9Id, @Tally3Id, @PipeDef1Id, @Customer3Id, @Tier6Id, 5.95, 7, 15);

-- Equipment for Tally --
DECLARE @EquipmentForTally1Id UNIQUEIDENTIFIER = 'A3B1F1AA-2B66-4F5D-9A11-FFECC25B1A9F';
DECLARE @EquipmentForTally2Id UNIQUEIDENTIFIER = 'D3C6D82B-5F6C-487E-9C39-897D9C9E7B27';
DECLARE @EquipmentForTally3Id UNIQUEIDENTIFIER = 'F51D0879-5BDB-4BC7-9E4C-25417B7B9AAE';
DECLARE @EquipmentForTally4Id UNIQUEIDENTIFIER = '39E658B4-53C3-4BD7-B6D4-B2C4C728A7AB';
DECLARE @EquipmentForTally5Id UNIQUEIDENTIFIER = 'A1E4C647-7BFA-4AC7-82F1-4D31C7B1C2AB';
DECLARE @EquipmentForTally6Id UNIQUEIDENTIFIER = 'B63D2C3E-2A5A-4EB7-A6F7-83485C6B3B44';

INSERT INTO EquipmentForTally (EquipmentForTallyId, TallyId, RackId, EquipmentDefinitionId, CustomerId, Quantity, LengthInMeters) 
VALUES 
(@EquipmentForTally1Id, @Tally1Id, @Rack4Id, @EquipmentDef1Id, @Customer1Id, 10, 100.0),
(@EquipmentForTally2Id, @Tally1Id, @Rack4Id, @EquipmentDef2Id, @Customer1Id, 5, 10.0),
(@EquipmentForTally3Id, @Tally1Id, @Rack5Id, @EquipmentDef3Id, @Customer2Id, 10, 100.0),
(@EquipmentForTally4Id, @Tally2Id, @Rack5Id, @EquipmentDef1Id, @Customer1Id, 10, 100.0),
(@EquipmentForTally5Id, @Tally2Id, @Rack5Id, @EquipmentDef2Id, @Customer3Id, 10, 100.0),
(@EquipmentForTally6Id, @Tally3Id, @Rack5Id, @EquipmentDef4Id, @Customer3Id, 10, 100.0);

GO
