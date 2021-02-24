export const statusTableLabels = [
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

export const statusTableData = [
  {
    id: 0,
    client: 'Dejesus',
    department: 'Cheif',
    role:'xxx',
    shiftDate: new Date(),
    startTime: 10,
    endTime: 15,
    locationShift:'TongTOng Xin Street0',
    status: statusTableLabels[2]
  },
  {
    id: 1,
    client: 'Dejesus',
    department: 'Cheif',
    role:'xxx',
    shiftDate: new Date(),
    startTime: 10,
    endTime: 15,
    locationShift:'TongTOng Xin Street0',
    status: statusTableLabels[4]
  },
  {
    id: 2,
    client: 'Dejesus',
    department: 'Cheif',
    role:'xxx',
    shiftDate: new Date(),
    startTime: 10,
    endTime: 15,
    locationShift:'TongTOng Xin Street0',
    status: statusTableLabels[4]
  },
];
