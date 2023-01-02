import moment from 'moment';

// format unix timestamp to YYYY-MM-DD HH:mm:ss
export const formatUnix = (unix) => {
  return moment.unix(unix).format('DD-MM HH:mm');
};

// extract Date from unix timestamp
export const extractDate = (unix) => {
  return moment.unix(unix).format('DD-MM-YYYY');
};

// extract Time from unix timestamp
export const extractTime = (unix) => {
  return moment.unix(unix).format('HH:mm:ss');
};
