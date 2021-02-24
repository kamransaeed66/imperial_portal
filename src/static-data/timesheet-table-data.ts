import { formatDate } from '@angular/common';

export const aioTableLabelsOne = [
  {
    text: 'Timesheet Submitted',
    textClass: 'text-green',
    bgClass: 'bg-green-light',
    previewClass: 'bg-green'
  },
  {
    text: 'Pending',
    textClass: 'text-cyan',
    bgClass: 'bg-cyan-light',
    previewClass: 'bg-cyan'
  },
  {
    text: 'In Progress',
    textClass: 'text-teal',
    bgClass: 'bg-teal-light',
    previewClass: 'bg-teal'
  },
  {
    text: 'Cancelled',
    textClass: 'text-teal',
    bgClass: 'bg-teal-light',
    previewClass: 'bg-teal'
  },
  {
    text: 'Completed',
    textClass: 'text-purple',
    bgClass: 'bg-purple-light',
    previewClass: 'bg-purple'
  },
];

export const TimesheetTableData = [
  {
    id: 0,
    department: 'Cheif',
    role:'xxx',
    shiftDate: '2020/03/03' ,
    total:8,
    fulfilled:2,
    totalStaff:'2 / 8',
  locationShift:'TongTOng Xin Street0',
    status: aioTableLabelsOne[0]
  },
  {
    id: 1,
    department: 'Cheif',
    role:'xxx',
    shiftDate: '2020/04/03',
    total:1,
    fulfilled:1,
    totalStaff:'1 / 1',
  locationShift:'TongTOng Xin Street0',
    status: aioTableLabelsOne[1]
  },
  {
    id: 2,
    department: 'Cheif',
    role:'xxx',
    shiftDate: '2018/03/09',
    total:10,
    fulfilled:8,
    totalStaff:'8 / 10',
    locationShift:'TongTOng Xin Street0',
    status: aioTableLabelsOne[3]
  }
];
