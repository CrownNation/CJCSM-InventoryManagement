IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Customer] (
    [CustomerId] uniqueidentifier NOT NULL,
    [Name] nvarchar(50) NOT NULL,
    [Address1] nvarchar(30) NULL,
    [Address2] nvarchar(30) NULL,
    [City] nvarchar(30) NULL,
    [ProvinceState] nvarchar(2) NULL,
    [Country] nvarchar(2) NULL,
    [PostalCode] nvarchar(6) NULL,
    [Email] nvarchar(30) NULL,
    [IsActive] bit NOT NULL,
    [DateOfCreation] datetimeoffset NOT NULL,
    [DateOfLastUpdate] datetimeoffset NOT NULL,
    CONSTRAINT [PK_Customer] PRIMARY KEY ([CustomerId])
);
GO

CREATE TABLE [Equipment] (
    [EquipmentId] uniqueidentifier NOT NULL,
    [RackId] uniqueidentifier NOT NULL,
    [EquipmentDefinitionId] uniqueidentifier NOT NULL,
    [CustomerId] uniqueidentifier NOT NULL,
    [Quantity] int NOT NULL,
    [LengthInMeters] decimal(18,2) NOT NULL,
    [LengthInFeet] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_Equipment] PRIMARY KEY ([EquipmentId])
);
GO

CREATE TABLE [Pipe] (
    [PipeId] uniqueidentifier NOT NULL,
    [PipeDefinitionId] uniqueidentifier NOT NULL,
    [CustomerId] uniqueidentifier NOT NULL,
    [TierId] uniqueidentifier NOT NULL,
    [LengthInMeters] decimal(18,2) NOT NULL,
    [LengthInFeet] decimal(18,2) NOT NULL,
    [Quantity] int NOT NULL,
    [IndexOfPipe] int NOT NULL,
    CONSTRAINT [PK_Pipe] PRIMARY KEY ([PipeId])
);
GO

CREATE TABLE [PipeProperty_Category] (
    [PipeProperty_CategoryId] uniqueidentifier NOT NULL,
    [Name] nvarchar(15) NOT NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_PipeProperty_Category] PRIMARY KEY ([PipeProperty_CategoryId])
);
GO

CREATE TABLE [PipeProperty_Coating] (
    [PipeProperty_CoatingId] uniqueidentifier NOT NULL,
    [Name] nvarchar(25) NOT NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_PipeProperty_Coating] PRIMARY KEY ([PipeProperty_CoatingId])
);
GO

CREATE TABLE [PipeProperty_Condition] (
    [PipeProperty_ConditionId] uniqueidentifier NOT NULL,
    [Name] nvarchar(25) NOT NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_PipeProperty_Condition] PRIMARY KEY ([PipeProperty_ConditionId])
);
GO

CREATE TABLE [PipeProperty_Grade] (
    [PipeProperty_GradeId] uniqueidentifier NOT NULL,
    [Name] nvarchar(15) NOT NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_PipeProperty_Grade] PRIMARY KEY ([PipeProperty_GradeId])
);
GO

CREATE TABLE [PipeProperty_Range] (
    [PipeProperty_RangeId] uniqueidentifier NOT NULL,
    [Name] nvarchar(15) NOT NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_PipeProperty_Range] PRIMARY KEY ([PipeProperty_RangeId])
);
GO

CREATE TABLE [PipeProperty_Size] (
    [PipeProperty_SizeId] uniqueidentifier NOT NULL,
    [SizeMetric] decimal(6,2) NOT NULL,
    [SizeImperial] decimal(6,3) NOT NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_PipeProperty_Size] PRIMARY KEY ([PipeProperty_SizeId])
);
GO

CREATE TABLE [PipeProperty_Thread] (
    [PipeProperty_ThreadId] uniqueidentifier NOT NULL,
    [Name] nvarchar(15) NOT NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_PipeProperty_Thread] PRIMARY KEY ([PipeProperty_ThreadId])
);
GO

CREATE TABLE [PipeProperty_Wall] (
    [PipeProperty_WallId] uniqueidentifier NOT NULL,
    [WallMetric] decimal(5,2) NOT NULL,
    [WallImperial] decimal(4,3) NOT NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_PipeProperty_Wall] PRIMARY KEY ([PipeProperty_WallId])
);
GO

CREATE TABLE [PipeProperty_Weight] (
    [PipeProperty_WeightId] uniqueidentifier NOT NULL,
    [WeightInKgPerMeter] decimal(6,2) NOT NULL,
    [WeightInLbsPerFoot] decimal(6,3) NOT NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_PipeProperty_Weight] PRIMARY KEY ([PipeProperty_WeightId])
);
GO

CREATE TABLE [ShopLocation] (
    [ShopLocationId] uniqueidentifier NOT NULL,
    [Name] nvarchar(50) NOT NULL,
    [Address1] nvarchar(30) NULL,
    [Address2] nvarchar(30) NULL,
    [City] nvarchar(30) NULL,
    [ProvinceState] nvarchar(2) NULL,
    [Country] nvarchar(2) NULL,
    [PostalCode] nvarchar(6) NULL,
    [PhoneNumber] nvarchar(20) NULL,
    [FaxNumber] nvarchar(20) NULL,
    [IsActive] bit NOT NULL,
    CONSTRAINT [PK_ShopLocation] PRIMARY KEY ([ShopLocationId])
);
GO

CREATE TABLE [Tally] (
    [TallyId] uniqueidentifier NOT NULL,
    [CustomerId] uniqueidentifier NOT NULL,
    [ShopLocationId] uniqueidentifier NOT NULL,
    [TallyType] int NOT NULL,
    [DateOfCreation] datetimeoffset NOT NULL,
    [Notes] nvarchar(max) NULL,
    [TallyNumber] nvarchar(max) NOT NULL,
    [InvoiceNumber] nvarchar(max) NULL,
    [TalliedByUserId] uniqueidentifier NOT NULL,
    [CarrierName] nvarchar(max) NULL,
    CONSTRAINT [PK_Tally] PRIMARY KEY ([TallyId])
);
GO

CREATE TABLE [Tier] (
    [TierId] uniqueidentifier NOT NULL,
    [RackId] uniqueidentifier NOT NULL,
    [Number] int NOT NULL,
    CONSTRAINT [PK_Tier] PRIMARY KEY ([TierId])
);
GO

CREATE TABLE [EquipmentDefinition] (
    [EquipmentDefinitionId] uniqueidentifier NOT NULL,
    [IsActive] bit NOT NULL,
    [Description] nvarchar(60) NOT NULL,
    [Category] nvarchar(25) NOT NULL,
    [PipeProperty_GradeId] uniqueidentifier NOT NULL,
    [PipeProperty_SizeId] uniqueidentifier NOT NULL,
    [Notes] nvarchar(max) NULL,
    CONSTRAINT [PK_EquipmentDefinition] PRIMARY KEY ([EquipmentDefinitionId]),
    CONSTRAINT [FK_EquipmentDefinition_PipeProperty_Grade_PipeProperty_GradeId] FOREIGN KEY ([PipeProperty_GradeId]) REFERENCES [PipeProperty_Grade] ([PipeProperty_GradeId]) ON DELETE CASCADE,
    CONSTRAINT [FK_EquipmentDefinition_PipeProperty_Size_PipeProperty_SizeId] FOREIGN KEY ([PipeProperty_SizeId]) REFERENCES [PipeProperty_Size] ([PipeProperty_SizeId]) ON DELETE CASCADE
);
GO

CREATE TABLE [PipeDefinition] (
    [PipeDefinitionId] uniqueidentifier NOT NULL,
    [IsActive] bit NOT NULL,
    [CategoryId] uniqueidentifier NULL,
    [CoatingId] uniqueidentifier NULL,
    [ConditionId] uniqueidentifier NULL,
    [GradeId] uniqueidentifier NULL,
    [RangeId] uniqueidentifier NULL,
    [SizeId] uniqueidentifier NULL,
    [ThreadId] uniqueidentifier NULL,
    [WallId] uniqueidentifier NULL,
    [WeightId] uniqueidentifier NULL,
    CONSTRAINT [PK_PipeDefinition] PRIMARY KEY ([PipeDefinitionId]),
    CONSTRAINT [FK_PipeDefinition_PipeProperty_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [PipeProperty_Category] ([PipeProperty_CategoryId]),
    CONSTRAINT [FK_PipeDefinition_PipeProperty_Coating_CoatingId] FOREIGN KEY ([CoatingId]) REFERENCES [PipeProperty_Coating] ([PipeProperty_CoatingId]),
    CONSTRAINT [FK_PipeDefinition_PipeProperty_Condition_ConditionId] FOREIGN KEY ([ConditionId]) REFERENCES [PipeProperty_Condition] ([PipeProperty_ConditionId]),
    CONSTRAINT [FK_PipeDefinition_PipeProperty_Grade_GradeId] FOREIGN KEY ([GradeId]) REFERENCES [PipeProperty_Grade] ([PipeProperty_GradeId]),
    CONSTRAINT [FK_PipeDefinition_PipeProperty_Range_RangeId] FOREIGN KEY ([RangeId]) REFERENCES [PipeProperty_Range] ([PipeProperty_RangeId]),
    CONSTRAINT [FK_PipeDefinition_PipeProperty_Size_SizeId] FOREIGN KEY ([SizeId]) REFERENCES [PipeProperty_Size] ([PipeProperty_SizeId]),
    CONSTRAINT [FK_PipeDefinition_PipeProperty_Thread_ThreadId] FOREIGN KEY ([ThreadId]) REFERENCES [PipeProperty_Thread] ([PipeProperty_ThreadId]),
    CONSTRAINT [FK_PipeDefinition_PipeProperty_Wall_WallId] FOREIGN KEY ([WallId]) REFERENCES [PipeProperty_Wall] ([PipeProperty_WallId]),
    CONSTRAINT [FK_PipeDefinition_PipeProperty_Weight_WeightId] FOREIGN KEY ([WeightId]) REFERENCES [PipeProperty_Weight] ([PipeProperty_WeightId])
);
GO

CREATE TABLE [Rack] (
    [RackId] uniqueidentifier NOT NULL,
    [Name] nvarchar(50) NOT NULL,
    [ShopLocationId] uniqueidentifier NOT NULL,
    [IsActive] bit NOT NULL,
    [Description] nvarchar(max) NOT NULL,
    [JointsPerTier] int NOT NULL,
    [RackType] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Rack] PRIMARY KEY ([RackId]),
    CONSTRAINT [FK_Rack_ShopLocation_ShopLocationId] FOREIGN KEY ([ShopLocationId]) REFERENCES [ShopLocation] ([ShopLocationId]) ON DELETE CASCADE
);
GO

CREATE TABLE [TallyEquipment] (
    [TallyId] uniqueidentifier NOT NULL,
    [EquipmentId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_TallyEquipment] PRIMARY KEY ([TallyId], [EquipmentId]),
    CONSTRAINT [FK_TallyEquipment_Equipment_EquipmentId] FOREIGN KEY ([EquipmentId]) REFERENCES [Equipment] ([EquipmentId]) ON DELETE CASCADE,
    CONSTRAINT [FK_TallyEquipment_Tally_TallyId] FOREIGN KEY ([TallyId]) REFERENCES [Tally] ([TallyId]) ON DELETE CASCADE
);
GO

CREATE TABLE [TallyPipe] (
    [TallyId] uniqueidentifier NOT NULL,
    [PipeId] uniqueidentifier NOT NULL,
    CONSTRAINT [PK_TallyPipe] PRIMARY KEY ([TallyId], [PipeId]),
    CONSTRAINT [FK_TallyPipe_Pipe_PipeId] FOREIGN KEY ([PipeId]) REFERENCES [Pipe] ([PipeId]) ON DELETE CASCADE,
    CONSTRAINT [FK_TallyPipe_Tally_TallyId] FOREIGN KEY ([TallyId]) REFERENCES [Tally] ([TallyId]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_EquipmentDefinition_PipeProperty_GradeId] ON [EquipmentDefinition] ([PipeProperty_GradeId]);
GO

CREATE INDEX [IX_EquipmentDefinition_PipeProperty_SizeId] ON [EquipmentDefinition] ([PipeProperty_SizeId]);
GO

CREATE INDEX [IX_PipeDefinition_CategoryId] ON [PipeDefinition] ([CategoryId]);
GO

CREATE INDEX [IX_PipeDefinition_CoatingId] ON [PipeDefinition] ([CoatingId]);
GO

CREATE INDEX [IX_PipeDefinition_ConditionId] ON [PipeDefinition] ([ConditionId]);
GO

CREATE INDEX [IX_PipeDefinition_GradeId] ON [PipeDefinition] ([GradeId]);
GO

CREATE INDEX [IX_PipeDefinition_RangeId] ON [PipeDefinition] ([RangeId]);
GO

CREATE INDEX [IX_PipeDefinition_SizeId] ON [PipeDefinition] ([SizeId]);
GO

CREATE INDEX [IX_PipeDefinition_ThreadId] ON [PipeDefinition] ([ThreadId]);
GO

CREATE INDEX [IX_PipeDefinition_WallId] ON [PipeDefinition] ([WallId]);
GO

CREATE INDEX [IX_PipeDefinition_WeightId] ON [PipeDefinition] ([WeightId]);
GO

CREATE INDEX [IX_Rack_ShopLocationId] ON [Rack] ([ShopLocationId]);
GO

CREATE INDEX [IX_TallyEquipment_EquipmentId] ON [TallyEquipment] ([EquipmentId]);
GO

CREATE INDEX [IX_TallyPipe_PipeId] ON [TallyPipe] ([PipeId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240515034331_20240514_InitialCreate', N'7.0.2');
GO

COMMIT;
GO

