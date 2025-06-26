export interface OrderData {
  date: string;
  orders: number;
  revenue: number;
}

export interface ChartData {
  weekly: OrderData[];
  monthly: OrderData[];
  sixMonths: OrderData[];
}

export interface OrderStatusData {
  status: string;
  count: number;
  color: string;
}

export interface CuisineData {
  cuisine: string;
  orders: number;
  revenue: number;
}

// Large dataset for restaurant dashboard
// export const revenueAndOrdersData: ChartData = {
//   weekly: [
//     { date: '2024-06-19', orders: 145, revenue: 12850 },
//     { date: '2024-06-20', orders: 162, revenue: 15240 },
//     { date: '2024-06-21', orders: 138, revenue: 11390 },
//     { date: '2024-06-22', orders: 187, revenue: 18180 },
//     { date: '2024-06-23', orders: 201, revenue: 19520 },
//     { date: '2024-06-24', orders: 229, revenue: 23670 },
//     { date: '2024-06-25', orders: 196, revenue: 18890 }
//   ],
//   monthly: [
//     { date: '2024-06-01', orders: 82, revenue: 5250 },
//     { date: '2024-06-02', orders: 79, revenue: 5050 },
//     { date: '2024-06-03', orders: 47, revenue: 2960 },
//     { date: '2024-06-04', orders: 53, revenue: 3340 },
//     { date: '2024-06-05', orders: 42, revenue: 2650 },
//     { date: '2024-06-06', orders: 68, revenue: 4280 },
//     { date: '2024-06-07', orders: 73, revenue: 4670 },
//     { date: '2024-06-08', orders: 85, revenue: 5440 },
//     { date: '2024-06-09', orders: 77, revenue: 4920 },
//     { date: '2024-06-10', orders: 49, revenue: 3080 },
//     { date: '2024-06-11', orders: 54, revenue: 3400 },
//     { date: '2024-06-12', orders: 43, revenue: 2700 },
//     { date: '2024-06-13', orders: 66, revenue: 4150 },
//     { date: '2024-06-14', orders: 71, revenue: 4540 },
//     { date: '2024-06-15', orders: 83, revenue: 5310 },
//     { date: '2024-06-16', orders: 76, revenue: 4860 },
//     { date: '2024-06-17', orders: 48, revenue: 3020 },
//     { date: '2024-06-18', orders: 55, revenue: 3460 },
//     { date: '2024-06-19', orders: 45, revenue: 2850 },
//     { date: '2024-06-20', orders: 52, revenue: 3240 },
//     { date: '2024-06-21', orders: 38, revenue: 2390 },
//     { date: '2024-06-22', orders: 67, revenue: 4180 },
//     { date: '2024-06-23', orders: 71, revenue: 4520 },
//     { date: '2024-06-24', orders: 89, revenue: 5670 },
//     { date: '2024-06-25', orders: 76, revenue: 4890 },
//     { date: '2024-06-26', orders: 65, revenue: 4100 },
//     { date: '2024-06-27', orders: 70, revenue: 4480 },
//     { date: '2024-06-28', orders: 84, revenue: 5370 },
//     { date: '2024-06-29', orders: 88, revenue: 5630 },
//     { date: '2024-06-30', orders: 90, revenue: 5760 }

//   ],
//   sixMonths: [
//     { date: '2024-01', orders: 28450, revenue: 1845250 },
//     { date: '2024-02', orders: 26890, revenue: 1749340 },
//     { date: '2024-03', orders: 31120, revenue: 2028280 },
//     { date: '2024-04', orders: 29670, revenue: 1939055 },
//     { date: '2024-05', orders: 33340, revenue: 2182620 },
//     { date: '2024-06', orders: 32890, revenue: 2153350 }
//   ]
// };

export const revenueAndOrdersData: ChartData = {
  weekly: [
     {
    "date": "2025-06-19",
    "orders": 62,
    "revenue": 8043
  },
  {
    "date": "2025-06-20",
    "orders": 126,
    "revenue": 13656
  },
  {
    "date": "2025-06-21",
    "orders": 132,
    "revenue": 11189
  },
  {
    "date": "2025-06-22",
    "orders": 103,
    "revenue": 8873
  },
  {
    "date": "2025-06-23",
    "orders": 70,
    "revenue": 10869
  },
  {
    "date": "2025-06-24",
    "orders": 130,
    "revenue": 10738
  },
  {
    "date": "2025-06-25",
    "orders": 96,
    "revenue": 8050
  }
  ],
  monthly: [
    {
    "date": "2025-05-26",
    "orders": 83,
    "revenue": 11571
  },
  {
    "date": "2025-05-27",
    "orders": 118,
    "revenue": 11035
  },
  {
    "date": "2025-05-28",
    "orders": 123,
    "revenue": 10616
  },
  {
    "date": "2025-05-29",
    "orders": 63,
    "revenue": 14979
  },
  {
    "date": "2025-05-30",
    "orders": 150,
    "revenue": 6418
  },
  {
    "date": "2025-05-31",
    "orders": 137,
    "revenue": 14876
  },
  {
    "date": "2025-06-01",
    "orders": 62,
    "revenue": 14472
  },
  {
    "date": "2025-06-02",
    "orders": 98,
    "revenue": 7023
  },
  {
    "date": "2025-06-03",
    "orders": 147,
    "revenue": 12622
  },
  {
    "date": "2025-06-04",
    "orders": 95,
    "revenue": 6072
  },
  {
    "date": "2025-06-05",
    "orders": 71,
    "revenue": 8144
  },
  {
    "date": "2025-06-06",
    "orders": 87,
    "revenue": 9695
  },
  {
    "date": "2025-06-07",
    "orders": 68,
    "revenue": 13247
  },
  {
    "date": "2025-06-08",
    "orders": 86,
    "revenue": 6664
  },
  {
    "date": "2025-06-09",
    "orders": 94,
    "revenue": 13518
  },
  {
    "date": "2025-06-10",
    "orders": 127,
    "revenue": 6544
  },
  {
    "date": "2025-06-11",
    "orders": 59,
    "revenue": 7900
  },
  {
    "date": "2025-06-12",
    "orders": 106,
    "revenue": 11766
  },
  {
    "date": "2025-06-13",
    "orders": 88,
    "revenue": 14247
  },
  {
    "date": "2025-06-14",
    "orders": 117,
    "revenue": 12988
  },
  {
    "date": "2025-06-15",
    "orders": 98,
    "revenue": 14559
  },
  {
    "date": "2025-06-16",
    "orders": 129,
    "revenue": 7090
  },
  {
    "date": "2025-06-17",
    "orders": 125,
    "revenue": 7145
  },
  {
    "date": "2025-06-18",
    "orders": 102,
    "revenue": 11403
  },
  {
    "date": "2025-06-19",
    "orders": 62,
    "revenue": 8043
  },
  {
    "date": "2025-06-20",
    "orders": 126,
    "revenue": 13656
  },
  {
    "date": "2025-06-21",
    "orders": 132,
    "revenue": 11189
  },
  {
    "date": "2025-06-22",
    "orders": 103,
    "revenue": 8873
  },
  {
    "date": "2025-06-23",
    "orders": 70,
    "revenue": 10869
  },
  {
    "date": "2025-06-24",
    "orders": 130,
    "revenue": 10738
  },
  {
    "date": "2025-06-25",
    "orders": 96,
    "revenue": 8050
  },
  ],
  sixMonths: [
  {
    "date": "2025-01-01",
    "orders": 73,
    "revenue": 9681
  },
  {
    "date": "2025-01-02",
    "orders": 66,
    "revenue": 14164
  },
  {
    "date": "2025-01-03",
    "orders": 61,
    "revenue": 14175
  },
  {
    "date": "2025-01-04",
    "orders": 78,
    "revenue": 13184
  },
  {
    "date": "2025-01-05",
    "orders": 88,
    "revenue": 13227
  },
  {
    "date": "2025-01-06",
    "orders": 58,
    "revenue": 13115
  },
  {
    "date": "2025-01-07",
    "orders": 60,
    "revenue": 9789
  },
  {
    "date": "2025-01-08",
    "orders": 63,
    "revenue": 7056
  },
  {
    "date": "2025-01-09",
    "orders": 109,
    "revenue": 8227
  },
  {
    "date": "2025-01-10",
    "orders": 134,
    "revenue": 14026
  },
  {
    "date": "2025-01-11",
    "orders": 145,
    "revenue": 12504
  },
  {
    "date": "2025-01-12",
    "orders": 91,
    "revenue": 14757
  },
  {
    "date": "2025-01-13",
    "orders": 113,
    "revenue": 10711
  },
  {
    "date": "2025-01-14",
    "orders": 96,
    "revenue": 11353
  },
  {
    "date": "2025-01-15",
    "orders": 93,
    "revenue": 7181
  },
  {
    "date": "2025-01-16",
    "orders": 93,
    "revenue": 12485
  },
  {
    "date": "2025-01-17",
    "orders": 88,
    "revenue": 5478
  },
  {
    "date": "2025-01-18",
    "orders": 109,
    "revenue": 5154
  },
  {
    "date": "2025-01-19",
    "orders": 86,
    "revenue": 8648
  },
  {
    "date": "2025-01-20",
    "orders": 108,
    "revenue": 7481
  },
  {
    "date": "2025-01-21",
    "orders": 143,
    "revenue": 9125
  },
  {
    "date": "2025-01-22",
    "orders": 92,
    "revenue": 13561
  },
  {
    "date": "2025-01-23",
    "orders": 140,
    "revenue": 9670
  },
  {
    "date": "2025-01-24",
    "orders": 86,
    "revenue": 13864
  },
  {
    "date": "2025-01-25",
    "orders": 148,
    "revenue": 12315
  },
  {
    "date": "2025-01-26",
    "orders": 107,
    "revenue": 6095
  },
  {
    "date": "2025-01-27",
    "orders": 73,
    "revenue": 14251
  },
  {
    "date": "2025-01-28",
    "orders": 94,
    "revenue": 15862
  },
  {
    "date": "2025-01-29",
    "orders": 142,
    "revenue": 8781
  },
  {
    "date": "2025-01-30",
    "orders": 103,
    "revenue": 5473
  },
  {
    "date": "2025-01-31",
    "orders": 60,
    "revenue": 10427
  },
  {
    "date": "2025-02-01",
    "orders": 139,
    "revenue": 9708
  },
  {
    "date": "2025-02-02",
    "orders": 66,
    "revenue": 11301
  },
  {
    "date": "2025-02-03",
    "orders": 148,
    "revenue": 13724
  },
  {
    "date": "2025-02-04",
    "orders": 124,
    "revenue": 8826
  },
  {
    "date": "2025-02-05",
    "orders": 98,
    "revenue": 13674
  },
  {
    "date": "2025-02-06",
    "orders": 80,
    "revenue": 14867
  },
  {
    "date": "2025-02-07",
    "orders": 126,
    "revenue": 14716
  },
  {
    "date": "2025-02-08",
    "orders": 74,
    "revenue": 7519
  },
  {
    "date": "2025-02-09",
    "orders": 135,
    "revenue": 5982
  },
  {
    "date": "2025-02-10",
    "orders": 51,
    "revenue": 14833
  },
  {
    "date": "2025-02-11",
    "orders": 85,
    "revenue": 7626
  },
  {
    "date": "2025-02-12",
    "orders": 128,
    "revenue": 12860
  },
  {
    "date": "2025-02-13",
    "orders": 101,
    "revenue": 9607
  },
  {
    "date": "2025-02-14",
    "orders": 118,
    "revenue": 14347
  },
  {
    "date": "2025-02-15",
    "orders": 146,
    "revenue": 6766
  },
  {
    "date": "2025-02-16",
    "orders": 50,
    "revenue": 14592
  },
  {
    "date": "2025-02-17",
    "orders": 71,
    "revenue": 11270
  },
  {
    "date": "2025-02-18",
    "orders": 135,
    "revenue": 14183
  },
  {
    "date": "2025-02-19",
    "orders": 78,
    "revenue": 13645
  },
  {
    "date": "2025-02-20",
    "orders": 111,
    "revenue": 11861
  },
  {
    "date": "2025-02-21",
    "orders": 120,
    "revenue": 9937
  },
  {
    "date": "2025-02-22",
    "orders": 63,
    "revenue": 7165
  },
  {
    "date": "2025-02-23",
    "orders": 112,
    "revenue": 5434
  },
  {
    "date": "2025-02-24",
    "orders": 149,
    "revenue": 5854
  },
  {
    "date": "2025-02-25",
    "orders": 123,
    "revenue": 8597
  },
  {
    "date": "2025-02-26",
    "orders": 51,
    "revenue": 12059
  },
  {
    "date": "2025-02-27",
    "orders": 110,
    "revenue": 10649
  },
  {
    "date": "2025-02-28",
    "orders": 50,
    "revenue": 11408
  },
  {
    "date": "2025-03-01",
    "orders": 145,
    "revenue": 6147
  },
  {
    "date": "2025-03-02",
    "orders": 59,
    "revenue": 14522
  },
  {
    "date": "2025-03-03",
    "orders": 72,
    "revenue": 8725
  },
  {
    "date": "2025-03-04",
    "orders": 55,
    "revenue": 5210
  },
  {
    "date": "2025-03-05",
    "orders": 139,
    "revenue": 10787
  },
  {
    "date": "2025-03-06",
    "orders": 74,
    "revenue": 9465
  },
  {
    "date": "2025-03-07",
    "orders": 92,
    "revenue": 7708
  },
  {
    "date": "2025-03-08",
    "orders": 112,
    "revenue": 7504
  },
  {
    "date": "2025-03-09",
    "orders": 137,
    "revenue": 6663
  },
  {
    "date": "2025-03-10",
    "orders": 124,
    "revenue": 14402
  },
  {
    "date": "2025-03-11",
    "orders": 138,
    "revenue": 13345
  },
  {
    "date": "2025-03-12",
    "orders": 68,
    "revenue": 10417
  },
  {
    "date": "2025-03-13",
    "orders": 128,
    "revenue": 10236
  },
  {
    "date": "2025-03-14",
    "orders": 88,
    "revenue": 7163
  },
  {
    "date": "2025-03-15",
    "orders": 125,
    "revenue": 14801
  },
  {
    "date": "2025-03-16",
    "orders": 101,
    "revenue": 5757
  },
  {
    "date": "2025-03-17",
    "orders": 120,
    "revenue": 9849
  },
  {
    "date": "2025-03-18",
    "orders": 111,
    "revenue": 8796
  },
  {
    "date": "2025-03-19",
    "orders": 56,
    "revenue": 9960
  },
  {
    "date": "2025-03-20",
    "orders": 83,
    "revenue": 9403
  },
  {
    "date": "2025-03-21",
    "orders": 71,
    "revenue": 12671
  },
  {
    "date": "2025-03-22",
    "orders": 88,
    "revenue": 5431
  },
  {
    "date": "2025-03-23",
    "orders": 101,
    "revenue": 6825
  },
  {
    "date": "2025-03-24",
    "orders": 55,
    "revenue": 9798
  },
  {
    "date": "2025-03-25",
    "orders": 143,
    "revenue": 10500
  },
  {
    "date": "2025-03-26",
    "orders": 89,
    "revenue": 11824
  },
  {
    "date": "2025-03-27",
    "orders": 114,
    "revenue": 13234
  },
  {
    "date": "2025-03-28",
    "orders": 68,
    "revenue": 7020
  },
  {
    "date": "2025-03-29",
    "orders": 61,
    "revenue": 7430
  },
  {
    "date": "2025-03-30",
    "orders": 145,
    "revenue": 12058
  },
  {
    "date": "2025-03-31",
    "orders": 81,
    "revenue": 11340
  },
  {
    "date": "2025-04-01",
    "orders": 129,
    "revenue": 13008
  },
  {
    "date": "2025-04-02",
    "orders": 93,
    "revenue": 7192
  },
  {
    "date": "2025-04-03",
    "orders": 129,
    "revenue": 6826
  },
  {
    "date": "2025-04-04",
    "orders": 129,
    "revenue": 14686
  },
  {
    "date": "2025-04-05",
    "orders": 100,
    "revenue": 11881
  },
  {
    "date": "2025-04-06",
    "orders": 99,
    "revenue": 11570
  },
  {
    "date": "2025-04-07",
    "orders": 141,
    "revenue": 8070
  },
  {
    "date": "2025-04-08",
    "orders": 113,
    "revenue": 9298
  },
  {
    "date": "2025-04-09",
    "orders": 59,
    "revenue": 14135
  },
  {
    "date": "2025-04-10",
    "orders": 137,
    "revenue": 9406
  },
  {
    "date": "2025-04-11",
    "orders": 145,
    "revenue": 13908
  },
  {
    "date": "2025-04-12",
    "orders": 85,
    "revenue": 6480
  },
  {
    "date": "2025-04-13",
    "orders": 53,
    "revenue": 9964
  },
  {
    "date": "2025-04-14",
    "orders": 71,
    "revenue": 7156
  },
  {
    "date": "2025-04-15",
    "orders": 147,
    "revenue": 5713
  },
  {
    "date": "2025-04-16",
    "orders": 56,
    "revenue": 12139
  },
  {
    "date": "2025-04-17",
    "orders": 73,
    "revenue": 9228
  },
  {
    "date": "2025-04-18",
    "orders": 111,
    "revenue": 11553
  },
  {
    "date": "2025-04-19",
    "orders": 117,
    "revenue": 6815
  },
  {
    "date": "2025-04-20",
    "orders": 105,
    "revenue": 8875
  },
  {
    "date": "2025-04-21",
    "orders": 83,
    "revenue": 6987
  },
  {
    "date": "2025-04-22",
    "orders": 57,
    "revenue": 5334
  },
  {
    "date": "2025-04-23",
    "orders": 75,
    "revenue": 10046
  },
  {
    "date": "2025-04-24",
    "orders": 68,
    "revenue": 14586
  },
  {
    "date": "2025-04-25",
    "orders": 125,
    "revenue": 9039
  },
  {
    "date": "2025-04-26",
    "orders": 83,
    "revenue": 8742
  },
  {
    "date": "2025-04-27",
    "orders": 103,
    "revenue": 12210
  },
  {
    "date": "2025-04-28",
    "orders": 70,
    "revenue": 9450
  },
  {
    "date": "2025-04-29",
    "orders": 91,
    "revenue": 7901
  },
  {
    "date": "2025-04-30",
    "orders": 146,
    "revenue": 13082
  },
  {
    "date": "2025-05-01",
    "orders": 63,
    "revenue": 5086
  },
  {
    "date": "2025-05-02",
    "orders": 97,
    "revenue": 5580
  },
  {
    "date": "2025-05-03",
    "orders": 148,
    "revenue": 5234
  },
  {
    "date": "2025-05-04",
    "orders": 106,
    "revenue": 11734
  },
  {
    "date": "2025-05-05",
    "orders": 93,
    "revenue": 6671
  },
  {
    "date": "2025-05-06",
    "orders": 89,
    "revenue": 12083
  },
  {
    "date": "2025-05-07",
    "orders": 73,
    "revenue": 13619
  },
  {
    "date": "2025-05-08",
    "orders": 56,
    "revenue": 6814
  },
  {
    "date": "2025-05-09",
    "orders": 54,
    "revenue": 9341
  },
  {
    "date": "2025-05-10",
    "orders": 75,
    "revenue": 13890
  },
  {
    "date": "2025-05-11",
    "orders": 75,
    "revenue": 11260
  },
  {
    "date": "2025-05-12",
    "orders": 134,
    "revenue": 6209
  },
  {
    "date": "2025-05-13",
    "orders": 100,
    "revenue": 12611
  },
  {
    "date": "2025-05-14",
    "orders": 60,
    "revenue": 10317
  },
  {
    "date": "2025-05-15",
    "orders": 58,
    "revenue": 12939
  },
  {
    "date": "2025-05-16",
    "orders": 134,
    "revenue": 13253
  },
  {
    "date": "2025-05-17",
    "orders": 83,
    "revenue": 6627
  },
  {
    "date": "2025-05-18",
    "orders": 149,
    "revenue": 13723
  },
  {
    "date": "2025-05-19",
    "orders": 118,
    "revenue": 12409
  },
  {
    "date": "2025-05-20",
    "orders": 59,
    "revenue": 6297
  },
  {
    "date": "2025-05-21",
    "orders": 129,
    "revenue": 11925
  },
  {
    "date": "2025-05-22",
    "orders": 69,
    "revenue": 13722
  },
  {
    "date": "2025-05-23",
    "orders": 65,
    "revenue": 14175
  },
  {
    "date": "2025-05-24",
    "orders": 108,
    "revenue": 8229
  },
  {
    "date": "2025-05-25",
    "orders": 127,
    "revenue": 6614
  },
  
    {
    "date": "2025-05-26",
    "orders": 83,
    "revenue": 11571
  },
  {
    "date": "2025-05-27",
    "orders": 118,
    "revenue": 11035
  },
  {
    "date": "2025-05-28",
    "orders": 123,
    "revenue": 10616
  },
  {
    "date": "2025-05-29",
    "orders": 63,
    "revenue": 14979
  },
  {
    "date": "2025-05-30",
    "orders": 150,
    "revenue": 6418
  },
  {
    "date": "2025-05-31",
    "orders": 137,
    "revenue": 14876
  },
  {
    "date": "2025-06-01",
    "orders": 62,
    "revenue": 14472
  },
  {
    "date": "2025-06-02",
    "orders": 98,
    "revenue": 7023
  },
  {
    "date": "2025-06-03",
    "orders": 147,
    "revenue": 12622
  },
  {
    "date": "2025-06-04",
    "orders": 95,
    "revenue": 6072
  },
  {
    "date": "2025-06-05",
    "orders": 71,
    "revenue": 8144
  },
  {
    "date": "2025-06-06",
    "orders": 87,
    "revenue": 9695
  },
  {
    "date": "2025-06-07",
    "orders": 68,
    "revenue": 13247
  },
  {
    "date": "2025-06-08",
    "orders": 86,
    "revenue": 6664
  },
  {
    "date": "2025-06-09",
    "orders": 94,
    "revenue": 13518
  },
  {
    "date": "2025-06-10",
    "orders": 127,
    "revenue": 6544
  },
  {
    "date": "2025-06-11",
    "orders": 59,
    "revenue": 7900
  },
  {
    "date": "2025-06-12",
    "orders": 106,
    "revenue": 11766
  },
  {
    "date": "2025-06-13",
    "orders": 88,
    "revenue": 14247
  },
  {
    "date": "2025-06-14",
    "orders": 117,
    "revenue": 12988
  },
  {
    "date": "2025-06-15",
    "orders": 98,
    "revenue": 14559
  },
  {
    "date": "2025-06-16",
    "orders": 129,
    "revenue": 7090
  },
  {
    "date": "2025-06-17",
    "orders": 125,
    "revenue": 7145
  },
  {
    "date": "2025-06-18",
    "orders": 102,
    "revenue": 11403
  },
  {
    "date": "2025-06-19",
    "orders": 62,
    "revenue": 8043
  },
  {
    "date": "2025-06-20",
    "orders": 126,
    "revenue": 13656
  },
  {
    "date": "2025-06-21",
    "orders": 132,
    "revenue": 11189
  },
  {
    "date": "2025-06-22",
    "orders": 103,
    "revenue": 8873
  },
  {
    "date": "2025-06-23",
    "orders": 70,
    "revenue": 10869
  },
  {
    "date": "2025-06-24",
    "orders": 130,
    "revenue": 10738
  },
  {
    "date": "2025-06-25",
    "orders": 96,
    "revenue": 8050
  },
  
],
};

export const orderStatusData: OrderStatusData[] = [
  { status: "Completed", count: 856, color: "#10B981" },
  { status: "Preparing", count: 423, color: "#F59E0B" },
  { status: "Pending", count: 189, color: "#EF4444" },
  { status: "Cancelled", count: 134, color: "#6B7280" },
  { status: "Delivered", count: 2234, color: "#3B82F6" },
  { status: "Out for Delivery", count: 256, color: "#8B5CF6" },
];

export const cuisineData: CuisineData[] = [
  { cuisine: "Indian", orders: 1289, revenue: 165670 },
  { cuisine: "Italian", orders: 845, revenue: 138890 },
  { cuisine: "Continental", orders: 634, revenue: 92980 },
  { cuisine: "Thai", orders: 928, revenue: 78340 },
  { cuisine: "Mexican", orders: 456, revenue: 67230 },
  { cuisine: "French", orders: 167, revenue: 92340 },
];

// Additional large datasets for more comprehensive analytics
export const dailyRevenueData = [
  { date: "2024-06-01", orders: 234, revenue: 18950 },
  { date: "2024-06-02", orders: 289, revenue: 23470 },
  { date: "2024-06-03", orders: 198, revenue: 16780 },
  { date: "2024-06-04", orders: 267, revenue: 21340 },
  { date: "2024-06-05", orders: 312, revenue: 25890 },
  { date: "2024-06-06", orders: 345, revenue: 28940 },
  { date: "2024-06-07", orders: 298, revenue: 24560 },
  { date: "2024-06-08", orders: 278, revenue: 22340 },
  { date: "2024-06-09", orders: 356, revenue: 29870 },
  { date: "2024-06-10", orders: 389, revenue: 32450 },
  { date: "2024-06-11", orders: 423, revenue: 35690 },
  { date: "2024-06-12", orders: 456, revenue: 38920 },
  { date: "2024-06-13", orders: 398, revenue: 33450 },
  { date: "2024-06-14", orders: 367, revenue: 30890 },
  { date: "2024-06-15", orders: 445, revenue: 37840 },
  { date: "2024-06-16", orders: 512, revenue: 43670 },
  { date: "2024-06-17", orders: 489, revenue: 41230 },
  { date: "2024-06-18", orders: 434, revenue: 36780 },
  { date: "2024-06-19", orders: 567, revenue: 48950 },
  { date: "2024-06-20", orders: 598, revenue: 51340 },
  { date: "2024-06-21", orders: 534, revenue: 45670 },
  { date: "2024-06-22", orders: 612, revenue: 52890 },
  { date: "2024-06-23", orders: 645, revenue: 55780 },
  { date: "2024-06-24", orders: 698, revenue: 60340 },
  { date: "2024-06-25", orders: 656, revenue: 56890 },
  { date: "2024-06-26", orders: 623, revenue: 53670 },
  { date: "2024-06-27", orders: 589, revenue: 50450 },
  { date: "2024-06-28", orders: 634, revenue: 54890 },
  { date: "2024-06-29", orders: 667, revenue: 57920 },
  { date: "2024-06-30", orders: 712, revenue: 61840 },
];

export const topDishesData = [
  { name: "Butter Chicken", orders: 1456, revenue: 145600, category: "Indian" },
  {
    name: "Chicken Biryani",
    orders: 1289,
    revenue: 167570,
    category: "Indian",
  },
  {
    name: "Paneer Tikka Masala",
    orders: 987,
    revenue: 98700,
    category: "Indian",
  },
  {
    name: "Margherita Pizza",
    orders: 734,
    revenue: 88080,
    category: "Italian",
  },
  { name: "Pasta Alfredo", orders: 656, revenue: 85280, category: "Italian" },
  {
    name: "Chicken Tikka Pizza",
    orders: 589,
    revenue: 82460,
    category: "Italian",
  },
  { name: "Pad Thai", orders: 523, revenue: 57530, category: "Thai" },
  { name: "Green Curry", orders: 467, revenue: 51370, category: "Thai" },
  { name: "Fish Tacos", orders: 434, revenue: 52080, category: "Mexican" },
  { name: "Chicken Burrito", orders: 398, revenue: 43780, category: "Mexican" },
  { name: "Sushi Platter", orders: 356, revenue: 71200, category: "Japanese" },
  {
    name: "Caesar Salad",
    orders: 289,
    revenue: 20230,
    category: "Continental",
  },
];

export const customerDemographics = [
  { ageGroup: "18-25", orders: 2456, percentage: 28.5 },
  { ageGroup: "26-35", orders: 3234, percentage: 37.6 },
  { ageGroup: "36-45", orders: 1987, percentage: 23.1 },
  { ageGroup: "46-55", orders: 734, percentage: 8.5 },
  { ageGroup: "56+", orders: 198, percentage: 2.3 },
];

export const paymentMethodData = [
  { method: "UPI", count: 4567, color: "#10B981" },
  { method: "Credit Card", count: 2234, color: "#3B82F6" },
  { method: "Debit Card", count: 1456, color: "#F59E0B" },
  { method: "Cash on Delivery", count: 567, color: "#EF4444" },
  { method: "Net Banking", count: 234, color: "#8B5CF6" },
  { method: "Wallet", count: 156, color: "#06B6D4" },
];
