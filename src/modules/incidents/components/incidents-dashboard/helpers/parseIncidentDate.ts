export function parseIncidentDate(value: string): number {
  const [datePart, timePart = '00:00'] = value.split(', ');
  if (!datePart) {
    return 0;
  }

  const [day = 0, month = 0, year = 0] = datePart.split('.').map(Number);
  const [hours = 0, minutes = 0] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes).getTime();
}
