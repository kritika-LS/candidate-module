import moment from "moment";

export const formatTime = (isoTime: string) => {
  const nowUtc = moment.utc(); // current time in UTC
  const timeUtc = moment.utc(isoTime); // input time in UTC

  if (nowUtc.isSame(timeUtc, 'day')) {
    const diffInMinutes = nowUtc.diff(timeUtc, 'minutes');
    const diffInHours = nowUtc.diff(timeUtc, 'hours');

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  if (nowUtc.clone().subtract(1, 'day').isSame(timeUtc, 'day')) {
    return `Yesterday at ${timeUtc.format('hh:mm A')} UTC`;
  }

  return timeUtc.format('MMM DD, YYYY');
};