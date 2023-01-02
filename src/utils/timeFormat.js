import moment from 'moment';

export const formatUnix = (unix) => {
  return moment.unix(unix).format('YYYY-MM-DD HH:mm:ss');
};
