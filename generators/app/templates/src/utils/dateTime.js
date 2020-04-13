export function addMinutesToUTCTime(utcDateTime, increment = 30) {
  return new Date(utcDateTime.setMinutes(utcDateTime.getMinutes() + increment));
}
