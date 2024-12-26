// Function to get status value by ID
export function getStatusValueById(id) {
  let statuses = [
    {id: 1, value: 'Requested'},
    {id: 2, value: 'Accepted'},
    {id: 3, value: 'Revoked'},
    {id: 4, value: 'Started'},
    {id: 5, value: 'Completed'},
    {id: 6, value: 'Cancelled'},
    {id: 7, value: 'Cancelled'},
    {id: 8, value: 'Request Timeout'},
  ];

  for (let status of statuses) {
    if (status.id === parseInt(id)) {
      return status.value;
    }
  }
  return null; // Return null if the provided ID doesn't match any status
}

export function convertTo12HourFormat(time24h) {
  // Splitting the time string into hours, minutes, and seconds
  let [hours, minutes, seconds] = time24h.split(':').map(Number);

  // Determining AM/PM
  let period = hours < 12 ? 'AM' : 'PM';

  // Converting to 12-hour format
  hours = hours % 12 || 12;

  // Formatting the time string
  let time12h = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${period}`;

  return time12h;
}

export function convertMinToHours(durationInMin) {
  const hours = Math.floor(durationInMin / 60); // Calculate whole hours
  const minutes = Math.floor(durationInMin % 60); // Remaining minutes

  if (hours > 0) {
    return `${hours} hrs ${minutes} mins`;
  }
  return `${minutes} mins`;
}

export function getInitials(name) {
  if (!name) return '';

  const words = name.trim().split(/\s+/);

  if (words.length < 2) {
    return words[0] ? words[0][0].toUpperCase() : '';
  }

  // Get the first letter of the first and last words
  const firstLetter = words[0][0].toUpperCase();
  const lastLetter = words[words.length - 1][0].toUpperCase();

  return firstLetter + lastLetter;
}
