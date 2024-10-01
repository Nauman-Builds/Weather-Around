import moment from 'moment';

export const convertUnixToTime = unixTimestamp => {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';

  const adjustedHours = hours % 12 || 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${adjustedHours}:${formattedMinutes} ${ampm}`;
};

export const filterFutureData = data => {
  const currentTime = moment(); // Get current local time

  return data.filter(item => {
    const itemTime = moment(item.dt_txt, 'YYYY-MM-DD HH:mm:ss');
    return (
      itemTime.isAfter(currentTime) && item.dt_txt === '2024-09-27 12:00:00'
    );
  });
};

export const filterByCurrentTime = dataArray => {
  const currentTime = new Date();
  return dataArray.filter(item => {
    const itemTime = new Date(item.dt_txt);
    return itemTime >= currentTime;
  });
};
