const data = {
  "power-consumtions": [
    {
      id: 1,
      date: "7/14/2021",
      site: "MSFT - A",
      unit: "Kw/hr",
      consumption: 800,
      avg_consumption: 1200,
      deviation: -2.5,
      action: "Check Equipment",
    },
    {
      id: 2,
      date: "7/15/2021",
      site: "MSFT - B",
      unit: "Kw/hr",
      consumption: 820,
      avg_consumption: 1200,
      deviation: 2.5,
      action: "Check Equipment",
    },
    {
      id: 3,
      date: "7/16/2021",
      site: "MSFT - B",
      unit: "Kw/hr",
      consumption: 850,
      avg_consumption: 1200,
      deviation: -2.5,
      action: "Check Equipment",
    },
    {
      id: 4,
      date: "7/17/2021",
      site: "MSFT - D",
      unit: "Kw/hr",
      consumption: 1200,
      avg_consumption: 1200,
      deviation: -3.0,
      action: "Check Equipment",
    },
    {
      id: 5,
      date: "7/18/2021",
      site: "MSFT - H",
      unit: "Kw/hr",
      consumption: 1500,
      avg_consumption: 1200,
      deviation: 4.0,
      action: "Check Equipment",
    },
    {
      id: 6,
      date: "7/18/2021",
      site: "MSFT - A",
      unit: "Kw/hr",
      consumption: 1000,
      avg_consumption: 1200,
      deviation: 3.5,
      action: "Check Equipment",
    },
    {
      id: 7,
      date: "7/19/2021",
      site: "MSFT - H",
      unit: "Kw/hr",
      consumption: 1250,
      avg_consumption: 1200,
      deviation: -1.5,
      action: "Check Equipment",
    },
    {
      id: 8,
      date: "7/13/2021",
      site: "MSFT - D",
      unit: "Kw/hr",
      consumption: 1100,
      avg_consumption: 1200,
      deviation: -5.5,
      action: "Check Equipment",
    },
    {
      id: 9,
      date: "7/12/2021",
      site: "MSFT - H",
      unit: "Kw/hr",
      consumption: 1220,
      avg_consumption: 1200,
      deviation: 2.5,
      action: "Check Equipment",
    },
    {
      id: 10,
      date: "7/12/2021",
      site: "MSFT - A",
      unit: "Kw/hr",
      consumption: 900,
      avg_consumption: 1200,
      deviation: 2.7,
      action: "Check Equipment",
    },
  ],
  powers: [
    {
      month: "Jan",
      consumption: 439,
    },
    {
      month: "Feb",
      consumption: 434,
    },
    {
      month: "Mar",
      consumption: 381,
    },
    {
      month: "Apr",
      consumption: 332,
    },
    {
      month: "May",
      consumption: 232,
    },
    {
      month: "Jun",
      consumption: 498,
    },
    {
      month: "Jul",
      consumption: 381,
    },
    {
      month: "Aug",
      consumption: 488,
    },
    {
      month: "Sep",
      consumption: 256,
    },
    {
      month: "Oct",
      consumption: 469,
    },
    {
      month: "Nov",
      consumption: 392,
    },
    {
      month: "Dec",
      consumption: 353,
    },
  ],
  "air-quality": [
    {
      id: 1,
      date: "7/14/2021",
      space_or_floor: "WMB#01",
      device: "Elevator Lobby",
      temperature: 31,
      humidity: 20,
      h25: 297,
      co2: 518,
      luminance: 3,
      pm25: 2.5,
      site: "MSFT - A",
    },
    {
      id: 2,
      date: "7/15/2021",
      space_or_floor: "WMB#01",
      device: "Trash Room",
      temperature: 34,
      humidity: 25,
      h25: 255,
      co2: 585,
      luminance: 4,
      pm25: 5.0,
      site: "MSFT - C",
    },
    {
      id: 3,
      date: "7/16/2021",
      space_or_floor: "WMB#01",
      device: "Bathrooms",
      temperature: 31,
      humidity: 26,
      h25: 233,
      co2: 595,
      luminance: 4,
      pm25: 3.0,
      site: "MSFT - B",
    },
    {
      id: 4,
      date: "7/17/2021",
      space_or_floor: "WMB#01",
      device: "Offices",
      temperature: 29,
      humidity: 27,
      h25: 286,
      co2: 503,
      luminance: 5,
      pm25: 10.5,
      site: "MSFT - D",
    },
    {
      id: 5,
      date: "7/18/2021",
      space_or_floor: "WMB#01",
      device: "Elevator Lobby",
      temperature: 30,
      humidity: 23,
      h25: 208,
      co2: 596,
      luminance: 1,
      pm25: 7.5,
      site: "MSFT - H",
    },
    {
      id: 6,
      date: "7/19/2021",
      space_or_floor: "WMB#01",
      device: "Trash Room",
      temperature: 33,
      humidity: 23,
      h25: 265,
      co2: 522,
      luminance: 9,
      pm25: 11.5,
      site: "MSFT - A",
    },
    {
      id: 7,
      date: "7/20/2021",
      space_or_floor: "WMB#02",
      device: "Bathrooms",
      temperature: 28,
      humidity: 25,
      h25: 244,
      co2: 587,
      luminance: 7,
      pm25: 2.5,
      site: "MSFT - C",
    },
    {
      id: 8,
      date: "7/2021/2021",
      space_or_floor: "WMB#02",
      device: "Offices",
      temperature: 26,
      humidity: 29,
      h25: 247,
      co2: 538,
      luminance: 7,
      pm25: 12.5,
      site: "MSFT - D",
    },
    {
      id: 9,
      date: "7/22/2021",
      space_or_floor: "WMB#02",
      device: "Elevator Lobby",
      temperature: 35,
      humidity: 22,
      h25: 205,
      co2: 528,
      luminance: 5,
      pm25: 6.5,
      site: "MSFT - H",
    },
    {
      id: 10,
      date: "7/23/2021",
      space_or_floor: "WMB#02",
      device: "Trash Room",
      temperature: 34,
      humidity: 29,
      h25: 280,
      co2: 520,
      luminance: 3,
      pm25: 7.5,
      site: "MSFT - B",
    },
    {
      id: 11,
      date: "7/24/2021",
      space_or_floor: "WMB#02",
      device: "Bathrooms",
      temperature: 35,
      humidity: 23,
      h25: 216,
      co2: 592,
      luminance: 8,
      pm25: 2.5,
      site: "MSFT - D",
    },
    {
      id: 12,
      date: "7/25/2021",
      space_or_floor: "WMB#03",
      device: "Offices",
      temperature: 25,
      humidity: 27,
      h25: 286,
      co2: 566,
      luminance: 4,
      pm25: 2.5,
      site: "MSFT - C",
    },
    {
      id: 13,
      date: "7/26/2021",
      space_or_floor: "WMB#03",
      device: "Elevator Lobby",
      temperature: 25,
      humidity: 20,
      h25: 239,
      co2: 567,
      luminance: 10,
      pm25: 2.5,
      site: "MSFT - B",
    },
    {
      id: 14,
      date: "7/27/2021",
      space_or_floor: "WMB#03",
      device: "Trash Room",
      temperature: 30,
      humidity: 21,
      h25: 297,
      co2: 591,
      luminance: 10,
      pm25: 0.5,
      site: "MSFT - H",
    },
    {
      id: 15,
      date: "7/28/2021",
      space_or_floor: "WMB#03",
      device: "Bathrooms",
      temperature: 30,
      humidity: 24,
      h25: 215,
      co2: 535,
      luminance: 10,
      pm25: 8.5,
      site: "MSFT - A",
    },
    {
      id: 16,
      date: "7/29/2021",
      space_or_floor: "WMB#03",
      device: "Offices",
      temperature: 34,
      humidity: 26,
      h25: 217,
      co2: 600,
      luminance: 7,
      pm25: 10.0,
      site: "MSFT - C",
    },
    {
      id: 17,
      date: "7/30/2021",
      space_or_floor: "WMB#03",
      device: "Elevator Lobby",
      temperature: 32,
      humidity: 29,
      h25: 218,
      co2: 576,
      luminance: 4,
      pm25: 2.5,
      site: "MSFT - B",
    },
    {
      id: 18,
      date: "7/31/2021",
      space_or_floor: "WMB#03",
      device: "Trash Room",
      temperature: 28,
      humidity: 27,
      h25: 286,
      co2: 579,
      luminance: 6,
      pm25: 7.5,
      site: "MSFT - D",
    },
    {
      id: 19,
      date: "8/1/2021",
      space_or_floor: "WMB#03",
      device: "Bathrooms",
      temperature: 34,
      humidity: 22,
      h25: 274,
      co2: 540,
      luminance: 10,
      pm25: 2.5,
      site: "MSFT - H",
    },
  ],
  "critical-alarms": [
    {
      id: 1,
      date: "7/14/2021",
      equipment: "Chiller #12",
      time_elapsed: "3:00",
      condition: "High Temperature",
      risk: "Can Fall, action Required",
      site: "MSFT - A",
    },
    {
      id: 2,
      date: "7/15/2021",
      equipment: "Condenser Pump",
      time_elapsed: "4:00",
      condition: "Motor Failure",
      risk: "Motor Failure",
      site: "MSFT - B",
    },
    {
      id: 3,
      date: "7/16/2021",
      equipment: "CNC #1",
      time_elapsed: "5:00",
      condition: "Motor Failure",
      risk: "Motor Failure",
      site: "MSFT - H",
    },
    {
      id: 4,
      date: "7/17/2021",
      equipment: "Chiller #13",
      time_elapsed: "6:00",
      condition: "High Temperature",
      risk: "Ventilation Failure",
      site: "MSFT - D",
    },
    {
      id: 5,
      date: "7/18/2021",
      equipment: "Condenser Pump",
      time_elapsed: "7:00",
      condition: "Motor Failure",
      risk: "Can Fall, action Required",
      site: "MSFT - A",
    },
    {
      id: 6,
      date: "7/19/2021",
      equipment: "CNC #2",
      time_elapsed: "8:00",
      condition: "Motor Failure",
      risk: "Motor Failure",
      site: "MSFT - D",
    },
    {
      id: 7,
      date: "7/20/2021",
      equipment: "Chiller #14",
      time_elapsed: "9:00",
      condition: "High Temperature",
      risk: "Motor Failure",
      site: "MSFT - B",
    },
    {
      id: 8,
      date: "7/2021/2021",
      equipment: "Condenser Pump",
      time_elapsed: "10:00",
      condition: "Motor Failure",
      risk: "Ventilation Failure",
      site: "MSFT - H",
    },
    {
      id: 9,
      date: "7/22/2021",
      equipment: "CNC #3",
      time_elapsed: "11:00",
      condition: "Motor Failure",
      risk: "Can Fall, action Required",
      site: "MSFT - A",
    },
    {
      id: 10,
      date: "7/23/2021",
      equipment: "Chiller #15",
      time_elapsed: "12:00",
      condition: "High Temperature",
      risk: "Motor Failure",
      site: "MSFT - A",
    },
    {
      id: 11,
      date: "7/24/2021",
      equipment: "Condenser Pump",
      time_elapsed: "13:00",
      condition: "Motor Failure",
      risk: "Motor Failure",
      site: "MSFT - B",
    },
    {
      id: 12,
      date: "7/25/2021",
      equipment: "CNC #4",
      time_elapsed: "14:00",
      condition: "Motor Failure",
      risk: "Ventilation Failure",
      site: "MSFT - D",
    },
    {
      id: 13,
      date: "7/26/2021",
      equipment: "Chiller #16",
      time_elapsed: "15:00",
      condition: "High Temperature",
      risk: "Can Fall, action Required",
      site: "MSFT - C",
    },
    {
      id: 14,
      date: "7/27/2021",
      equipment: "Condenser Pump",
      time_elapsed: "16:00",
      condition: "Motor Failure",
      risk: "Motor Failure",
      site: "MSFT - C",
    },
    {
      id: 15,
      date: "7/28/2021",
      equipment: "CNC #5",
      time_elapsed: "17:00",
      condition: "Motor Failure",
      risk: "Motor Failure",
      site: "MSFT - H",
    },
    {
      id: 16,
      date: "7/29/2021",
      equipment: "Chiller #17",
      time_elapsed: "18:00",
      condition: "High Temperature",
      risk: "Ventilation Failure",
      site: "MSFT - A",
    },
    {
      id: 17,
      date: "7/30/2021",
      equipment: "Condenser Pump",
      time_elapsed: "19:00",
      condition: "Motor Failure",
      risk: "Can Fall, action Required",
      site: "MSFT - D",
    },
    {
      id: 18,
      date: "7/31/2021",
      equipment: "CNC #6",
      time_elapsed: "20:00",
      condition: "Motor Failure",
      risk: "Motor Failure",
      site: "MSFT - B",
    },
    {
      id: 19,
      date: "8/1/2021",
      equipment: "Chiller #18",
      time_elapsed: "21:00",
      condition: "High Temperature",
      risk: "Motor Failure",
      site: "MSFT - C",
    },
  ],
  "commodity-transactions": [
    {
      id: 1,
      date: "7/14/2021",
      vendor: "MK Pvt Ldt",
      tanker_no: "TN28T203",
      block: "A",
      commodity: "Water",
      status: "Tanker In",
      timings: "35:45:00",
      site: "MSFT - A",
      capacity: 12000,
      delivery_challan: "09876",
      initial_reading: 500,
      final_reading: 8000,
      require_to_deliver: 10000,
      risk: "Less amount delivered",
    },
    {
      id: 2,
      date: "7/15/2021",
      vendor: "GH Pvt Ldt",
      tanker_no: "TN28T204",
      block: "B",
      commodity: "Oil",
      status: "Tanker Out",
      timings: "36:45:00",
      site: "MSFT - B",
      capacity: 12000,
      delivery_challan: "09876",
      initial_reading: 900,
      final_reading: 10000,
      require_to_deliver: 10000,
      risk: "Same challan number has been used, Dt: 12/07/2021, Site: MSFT - B",
    },
    {
      id: 3,
      date: "7/16/2021",
      vendor: "SM Pvt Ldt",
      tanker_no: "TN28T205",
      block: "C",
      commodity: "Sewage",
      status: "Tanker In",
      timings: "37:45:00",
      site: "MSFT - H",
      capacity: 20000,
      delivery_challan: "08590",
      initial_reading: 1200,
      final_reading: 10020,
      require_to_deliver: 10000,
      risk: "More amount delivered",
    },
    {
      id: 4,
      date: "7/17/2021",
      vendor: "44 Pvt Ldt",
      tanker_no: "TN28T206",
      block: "D",
      commodity: "Sewage",
      status: "Tanker Out",
      timings: "38:45:00",
      site: "MSFT - H",
      capacity: 25000,
      delivery_challan: "02347",
      initial_reading: 400,
      final_reading: 8000,
      require_to_deliver: 10000,
      risk: "Less amount delivered",
    },
    {
      id: 5,
      date: "7/18/2021",
      vendor: "44 Pvt Ldt",
      tanker_no: "TN28T206",
      block: "D",
      commodity: "Sewage",
      status: "Tanker Out",
      timings: "38:45:00",
      site: "MSFT - H",
      capacity: 25000,
      delivery_challan: "02347",
      initial_reading: 400,
      final_reading: 8000,
      require_to_deliver: 10000,
      risk: "Less amount delivered",
    },
  ],
};

export default data;