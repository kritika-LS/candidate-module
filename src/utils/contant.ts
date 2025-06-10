import moment from "moment";

export const convertHHmmToISOString = (hhmm:any) => {
    if (!/^\d{4}$/.test(hhmm)) {
        return hhmm;
    }
  
    const hours = hhmm.slice(0, 2);
    const minutes = hhmm.slice(2, 4);
  
    const reversedMoment = moment.utc(`1700-01-01T${hours}:${minutes}:00.000Z`);
    return reversedMoment.toISOString();
  };

export const formatHHmmTo12Hour = (hhmm:any) => {
    if (!/^\d{4}$/.test(hhmm)) {
        return hhmm;
    }
  
    const hours = hhmm.slice(0, 2);
    const minutes = hhmm.slice(2, 4);
  
    const time = moment(`${hours}:${minutes}`, 'HH:mm');
    return time.format('hh:mm A');
  };