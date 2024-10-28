exports.humanReadableTime = (seconds) => {
  function format(time) {
    return time < 10 ? `0${time}` : time;
  }
  return `${format(Math.floor(seconds / 3600))}:${format(
    Math.floor((seconds % 3600) / 60)
  )}:${format(Math.floor(seconds % 60))}`;
};
