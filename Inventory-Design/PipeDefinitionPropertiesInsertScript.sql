USE [CJCSM-Inventory];

-- PipeProperty_Category
INSERT INTO PipeProperty_Category (PipeProperty_CategoryId, Name) VALUES
  (NEWID(), 'Casing'),
  (NEWID(), 'Freight'),
  (NEWID(), 'Rods'),
  (NEWID(), 'Tubing');

-- PipeProperty_Condition
INSERT INTO PipeProperty_Condition (PipeProperty_ConditionId, Name) VALUES
  (NEWID(), '10 Ft Pup'),
  (NEWID(), '2 Ft Pup'),
  (NEWID(), '4 Ft Pup'),
  (NEWID(), '6 Ft Pup'),
  (NEWID(), '8 Ft Pup'),
  (NEWID(), 'B-Band'),
  (NEWID(), 'Bent'),
  (NEWID(), 'Damaged'),
  (NEWID(), 'Field Inspected'),
  (NEWID(), 'Field Inspected YB'),
  (NEWID(), 'G-Band'),
  (NEWID(), 'Invcondcde'),
  (NEWID(), 'Junk'),
  (NEWID(), 'N I'),
  (NEWID(), 'N/A'),
  (NEWID(), 'New'),
  (NEWID(), 'New DMG'),
  (NEWID(), 'New ISP'),
  (NEWID(), 'New Bent'),
  (NEWID(), 'Plugged'),
  (NEWID(), 'Red / End'),
  (NEWID(), 'Repair'),
  (NEWID(), 'T-Rej'),
  (NEWID(), 'To Be Inspected'),
  (NEWID(), 'UI'),
  (NEWID(), 'UINB'),
  (NEWID(), 'U-OK'),
  (NEWID(), 'Used'),
  (NEWID(), 'Used DMG'),
  (NEWID(), 'Y-Band');

-- PipeProperty_Range
INSERT INTO PipeProperty_Range (PipeProperty_RangeId, Name) VALUES
  (NEWID(), '1'),
  (NEWID(), '2'),
  (NEWID(), '3'),
  (NEWID(), 'MKR'),
  (NEWID(), 'PUPS');

-- PipeProperty_Size
  INSERT INTO PipeProperty_Size (PipeProperty_SizeId, SizeMetric, SizeImperial) VALUES
  (NEWID(), 0, 0),
  (NEWID(), 19.1, 0.752),
  (NEWID(), 22.2, 0.874),
  (NEWID(), 25.4, 1),
  (NEWID(), 33.4, 1.315),
  (NEWID(), 42.2, 1.661),
  (NEWID(), 48.3, 1.902),
  (NEWID(), 60.3, 2.374),
  (NEWID(), 73, 2.874),
  (NEWID(), 88.9, 3.5),
  (NEWID(), 101.6, 4),
  (NEWID(), 107.9, 4.248),
  (NEWID(), 114.3, 4.5),
  (NEWID(), 127, 5),
  (NEWID(), 139.7, 5.5),
  (NEWID(), 168.3, 6.626),
  (NEWID(), 177.8, 7),
  (NEWID(), 193.7, 7.626),
  (NEWID(), 219.1, 8.626),
  (NEWID(), 244.5, 9.626),
  (NEWID(), 250.8, 9.874),
  (NEWID(), 273, 10.748),
  (NEWID(), 298.4, 11.748),
  (NEWID(), 323.8, 12.748),
  (NEWID(), 339.7, 13.374),
  (NEWID(), 346.1, 13.626),
  (NEWID(), 406.4, 16),
  (NEWID(), 473, 18.622),
  (NEWID(), 508, 20),
  (NEWID(), 914, 36);

-- PipeProperty_Thread
INSERT INTO PipeProperty_Thread (PipeProperty_ThreadID, Name) VALUES
  (NEWID(), '8-ACME'),
  (NEWID(), 'A95'),
  (NEWID(), 'AB-STL'),
  (NEWID(), 'AMS-SI'),
  (NEWID(), 'AMS-XC'),
  (NEWID(), 'ANJO'),
  (NEWID(), 'ANT MS'),
  (NEWID(), 'BENDS'),
  (NEWID(), 'BEVELD'),
  (NEWID(), 'BT-C'),
  (NEWID(), 'BT-C-MOD'),
  (NEWID(), 'BT-LC'),
  (NEWID(), 'CS HYD'),
  (NEWID(), 'CSCB'),
  (NEWID(), 'DSS/HTC'),
  (NEWID(), 'EUE'),
  (NEWID(), 'EUE SCC'),
  (NEWID(), 'EUE/KC'),
  (NEWID(), 'EUE/MMS'),
  (NEWID(), 'EUE/MOD'),
  (NEWID(), 'FJ150'),
  (NEWID(), 'FL4S'),
  (NEWID(), 'GBW3PSS'),
  (NEWID(), 'HYD-503'),
  (NEWID(), 'HYD-511'),
  (NEWID(), 'HYD-521'),
  (NEWID(), 'HYD-533'),
  (NEWID(), 'HYD-563'),
  (NEWID(), 'HYD-A95'),
  (NEWID(), 'HYD-PH6'),
  (NEWID(), 'HYD-SUP'),
  (NEWID(), 'IJ'),
  (NEWID(), 'INVTHREA'),
  (NEWID(), 'LOCK-IT'),
  (NEWID(), 'LT'),
  (NEWID(), 'LT-C'),
  (NEWID(), 'LT-C-INT'),
  (NEWID(), 'N/A'),
  (NEWID(), 'NEWNK3SB'),
  (NEWID(), 'NK3SB'),
  (NEWID(), 'NKEL'),
  (NEWID(), 'NSCC'),
  (NEWID(), 'NSCT'),
  (NEWID(), 'NSIT'),
  (NEWID(), 'NUE'),
  (NEWID(), 'NULOCK'),
  (NEWID(), 'PxP'),
  (NEWID(), 'PJD'),
  (NEWID(), 'PLAIN-EN'),
  (NEWID(), 'QB2'),
  (NEWID(), 'REG'),
  (NEWID(), 'RTS-6'),
  (NEWID(), 'SCC'),
  (NEWID(), 'SLX HYD'),
  (NEWID(), 'ST-L'),
  (NEWID(), 'ST/C'),
  (NEWID(), 'TKC'),
  (NEWID(), 'TSHP'),
  (NEWID(), 'VAM'),
  (NEWID(), 'VAM-ACE'),
  (NEWID(), 'VAM-FJL'),
  (NEWID(), 'VAM-NEW'),
  (NEWID(), 'X-OVER');

-- PipeProperty_Wall
INSERT INTO PipeProperty_Wall (PipeProperty_WallId, WallMetric, WallImperial) VALUES
  (NEWID(), 3.18, .125),
  (NEWID(), 3.38, .133),
  (NEWID(), 3.56, .14),
  (NEWID(), 3.68, .145),
  (NEWID(), 3.91, .154),
  (NEWID(), 3.96, .156),
  (NEWID(), 4.37, .172),
  (NEWID(), 4.78, .188),
  (NEWID(), 4.83, .19),
  (NEWID(), 5.16, .203),
  (NEWID(), 5.21, .205),
  (NEWID(), 5.49, .216),
  (NEWID(), 5.51, .217),
  (NEWID(), 5.54, .218),
  (NEWID(), 5.56, .219),
  (NEWID(), 5.74, .226),
  (NEWID(), 5.87, .231),
  (NEWID(), 6.02, .237),
  (NEWID(), 6.2, .244),
  (NEWID(), 6.35, .25),
  (NEWID(), 6.45, .254),
  (NEWID(), 6.65, .262),
  (NEWID(), 6.71, .264),
  (NEWID(), 6.88, .271),
  (NEWID(), 6.91, .272),
  (NEWID(), 6.98, .275),
  (NEWID(), 7.11, .28),
  (NEWID(), 7.34, .289),
  (NEWID(), 7.37, .29),
  (NEWID(), 7.52, .296),
  (NEWID(), 7.62, .3),
  (NEWID(), 7.72, .304),
  (NEWID(), 7.8, .307),
  (NEWID(), 7.82, .308),
  (NEWID(), 7.92, .312),
  (NEWID(), 8.05, .317),
  (NEWID(), 8.17, .322),
  (NEWID(), 8.33, .328),
  (NEWID(), 8.46, .333),
  (NEWID(), 8.56, .337),
  (NEWID(), 8.74, .344),
  (NEWID(), 8.89, .35),
  (NEWID(), 8.94, .352),
  (NEWID(), 9.17, .361),
  (NEWID(), 9.19, .362),
  (NEWID(), 9.27, .365),
  (NEWID(), 9.52, .375),
  (NEWID(), 9.65, .38),
  (NEWID(), 10.03, .395),
  (NEWID(), 10.16, .4),
  (NEWID(), 10.31, .406),
  (NEWID(), 10.36, .408),
  (NEWID(), 10.54, .415),
  (NEWID(), 10.92, .43),
  (NEWID(), 11.05, .435),
  (NEWID(), 11.13, .438),
  (NEWID(), 11.3, .445),
  (NEWID(), 11.43, .45),
  (NEWID(), 11.51, .453),
  (NEWID(), 11.99, .472),
  (NEWID(), 12.19, .48),
  (NEWID(), 12.42, .489),
  (NEWID(), 12.7, .54),
  (NEWID(), 13.84,.545),
  (NEWID(), 14.27,.562),
  (NEWID(), 15.88,.625),
  (NEWID(), 17.78,.7);

-- PipeProperty_Weight
  INSERT INTO PipeProperty_Weight (PipeProperty_WeightId, WeightInKgPerMeter, WeightInLbsPerFoot)
VALUES
    (NEWID(), 2.41, 1.619),
    (NEWID(), 2.53, 1.7),
    (NEWID(), 2.56, 1.72),
    (NEWID(), 3.24, 2.177),
    (NEWID(), 3.47, 2.332),
    (NEWID(), 3.57, 2.399),
    (NEWID(), 4.05, 2.721),
    (NEWID(), 4.11, 2.762),
    (NEWID(), 4.3, 2.889),
    (NEWID(), 4.32, 2.903),
    (NEWID(), 4.48, 3.01),
    (NEWID(), 4.7, 3.158),
    (NEWID(), 5.61, 3.77),
    (NEWID(), 5.67, 3.81),
    (NEWID(), 6.99, 4.697),
    (NEWID(), 7.08, 4.758),
    (NEWID(), 7.47, 5.02),
    (NEWID(), 7.48, 5.026),
    (NEWID(), 7.71, 5.181),
    (NEWID(), 8.68, 5.833),
    (NEWID(), 8.69, 5.839),
    (NEWID(), 9.2, 6.182),
    (NEWID(), 9.38, 6.303),
    (NEWID(), 9.52, 6.397),
    (NEWID(), 9.67, 6.498),
    (NEWID(), 10.03, 6.74),
    (NEWID(), 10.24, 6.881),
    (NEWID(), 11.11, 7.466),
    (NEWID(), 11.28, 7.58),
    (NEWID(), 11.65, 7.828),
    (NEWID(), 12.33, 8.285),
    (NEWID(), 12.8, 8.601),
    (NEWID(), 12.81, 8.608),
    (NEWID(), 12.95, 8.702),
    (NEWID(), 13.39, 8.998),
    (NEWID(), 13.57, 9.119),
    (NEWID(), 13.63, 9.159),
    (NEWID(), 13.69, 9.199),
    (NEWID(), 13.84, 9.3),
    (NEWID(), 14.14, 9.502),
    (NEWID(), 14.37, 9.656),
    (NEWID(), 14.93, 10.032),
    (NEWID(), 15.18, 10.2),
    (NEWID(), 15.25, 10.248),
    (NEWID(), 15.27, 10.261),
    (NEWID(), 15.63, 10.503),
    (NEWID(), 16.06, 10.792),
    (NEWID(), 16.37, 11),
    (NEWID(), 16.56, 11.128),
    (NEWID(), 16.76, 11.262),
    (NEWID(), 16.9, 11.356),
    (NEWID(), 17.26, 11.598),
    (NEWID(), 18.1, 12.163),
    (NEWID(), 18.75, 12.599),
    (NEWID(), 18.9, 12.7),
    (NEWID(), 18.97, 12.747),
    (NEWID(), 19.27, 12.949),
    (NEWID(), 19.9, 13.372),
    (NEWID(), 19.98, 13.426),
    (NEWID(), 20.09, 13.5),
    (NEWID(), 20.83, 13.997),
    (NEWID(), 20.87, 14.024),
    (NEWID(), 21.31, 14.32),
    (NEWID(), 21.91, 14.723),
    (NEWID(), 21.92, 14.73),
    (NEWID(), 22.29, 14.978),
    (NEWID(), 22.32, 14.998),
    (NEWID(), 22.47, 15.099),
    (NEWID(), 22.8, 15.321),
    (NEWID(), 22.99, 15.449),
    (NEWID(), 23.07, 15.502),
    (NEWID(), 23.51, 15.798),
    (NEWID(), 25.02, 16.813),
    (NEWID(), 25.15, 16.9),
    (NEWID(), 25.3, 17.001),
    (NEWID(), 26.04, 17.498),
    (NEWID(), 26.06, 17.512),
    (NEWID(), 26.79, 18.002),
    (NEWID(), 28.07, 18.862),
    (NEWID(), 28.26, 18.99),
    (NEWID(), 28.29, 19.01),
    (NEWID(), 29.76, 19.998),
    (NEWID(), 30.14, 20.253),
    (NEWID(), 30.97, 20.811),
    (NEWID(), 31.9, 21.436),
    (NEWID(), 32.52, 21.852),
    (NEWID(), 32.61, 21.913),
    (NEWID(), 34.18, 22.968),
    (NEWID(), 34.23, 23.001),
    (NEWID(), 35.72, 24.003),
    (NEWID(), 38.69, 25.998),
    (NEWID(), 39.29, 26.402),
    (NEWID(), 41.67, 28.001),
    (NEWID(), 42.55, 28.592),
    (NEWID(), 43.16, 29.002),
    (NEWID(), 44.2, 29.701),
    (NEWID(), 46.12, 30.991),
    (NEWID(), 47.62, 31.999),
    (NEWID(), 48.07, 32.302),
    (NEWID(), 50.15, 33.699),
    (NEWID(), 52.09, 35.003),
    (NEWID(), 53.57, 35.997),
    (NEWID(), 54.15, 36.387),
    (NEWID(), 55.02, 36.972),
    (NEWID(), 56.55, 38),
    (NEWID(), 58.04, 39.001),
    (NEWID(), 59.53, 40.002),
    (NEWID(), 60.27, 40.5),
    (NEWID(), 61.28, 41.178),
    (NEWID(), 62.5, 41.998),
    (NEWID(), 64.57, 43.389),
    (NEWID(), 64.74, 43.503),
    (NEWID(), 67.71, 45.499),
    (NEWID(), 69.94, 46.998),
    (NEWID(), 73.75, 49.558),
    (NEWID(), 75.9, 51.002),
    (NEWID(), 79.62, 53.502),
    (NEWID(), 81.1, 54.497),
    (NEWID(), 82.59, 55.498),
    (NEWID(), 89.28, 59.993),
    (NEWID(), 90.78, 61.001),
    (NEWID(), 101.19, 67.997),
    (NEWID(), 102.39, 68.803),
    (NEWID(), 107.14, 71.995),
    (NEWID(), 107.15, 72.001),
    (NEWID(), 111.6, 74.992),
    (NEWID(), 130.21, 87.497),
    (NEWID(), 131.26, 88.203),
    (NEWID(), 139.87, 93.988),
    (NEWID(), 139.89, 94.002);


-- PipeProperty_Grade
INSERT INTO [dbo].[PipeProperty_Grade] ([PipeProperty_GradeId], [Name])
VALUES
    (NEWID(), '2500RB'),
    (NEWID(), '290'),
    (NEWID(), '317'),
    (NEWID(), '359'),
    (NEWID(), '359 C1'),
    (NEWID(), '78'),
    (NEWID(), 'A-1'),
    (NEWID(), 'A106B'),
    (NEWID(), 'A333'),
    (NEWID(), 'A3336-S'),
    (NEWID(), 'A53A106'),
    (NEWID(), 'AC80'),
    (NEWID(), 'C75'),
    (NEWID(), 'CW55'),
    (NEWID(), 'D'),
    (NEWID(), 'D/78'),
    (NEWID(), 'DST80SS'),
    (NEWID(), 'H40'),
    (NEWID(), 'HE'),
    (NEWID(), '180E'),
    (NEWID(), 'IK70'),
    (NEWID(), 'IK70E'),
    (NEWID(), 'INVGRADE'),
    (NEWID(), 'J'),
    (NEWID(), 'J55'),
    (NEWID(), 'JE'),
    (NEWID(), 'JE/X56'),
    (NEWID(), 'JERW'),
    (NEWID(), 'K'),
    (NEWID(), 'K55'),
    (NEWID(), 'KE'),
    (NEWID(), 'L80'),
    (NEWID(), 'L80 ERW'),
    (NEWID(), 'L80/ERW'),
    (NEWID(), 'L80E'),
    (NEWID(), 'MJ55'),
    (NEWID(), 'ML80'),
    (NEWID(), 'MN80'),
    (NEWID(), 'N/A'),
    (NEWID(), 'N80'),
    (NEWID(), 'NSS80HC'),
    (NEWID(), 'NT80SS'),
    (NEWID(), 'NT95S'),
    (NEWID(), 'NT95SS'),
    (NEWID(), 'P110'),
    (NEWID(), 'PS80'),
    (NEWID(), 'R-J'),
    (NEWID(), 'SA106B'),
    (NEWID(), 'SA333 6'),
    (NEWID(), 'SCH 80'),
    (NEWID(), 'SCH160'),
    (NEWID(), 'SOO55'),
    (NEWID(), 'SOO90'),
    (NEWID(), 'SOO95'),
    (NEWID(), 'T95'),
    (NEWID(), 'TN 110S'),
    (NEWID(), 'TN80SS'),
    (NEWID(), 'TN95HS'),
    (NEWID(), 'TN95SS'),
    (NEWID(), 'TRC80');

GO
