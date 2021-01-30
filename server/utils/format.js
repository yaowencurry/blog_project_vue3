function changeDate (date = new Date(), split = '-') {
  if (!date) return '';

  const yearVal = date.getFullYear();
  const monthVal = date.getMonth() + 1;
  const dateVal = date.getDate();
  const hourVal = date.getHours();
  const minuteVal = date.getMinutes();
  const secondVal = date.getSeconds();

  return yearVal + split + (monthVal > 9 ? monthVal : '0' + monthVal) + split + (dateVal > 9 ? dateVal : '0' + dateVal) + ' ' + (hourVal > 9 ? hourVal : '0' + hourVal) + ':' + (minuteVal > 9 ? minuteVal : '0' + minuteVal) + ':' + (secondVal > 9 ? secondVal : '0' + secondVal)
}


module.exports = {
  changeDate
}