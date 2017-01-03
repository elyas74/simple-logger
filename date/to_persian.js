//
//
//

const convert_date = require('./core');

function date_to_persian(string_date, cb) {

  cb = cb || function() {};

  if (!string_date) {
    return cb({
      status: 400
    })
  }

  let date = new Date(string_date);

  let min = date.getMinutes();
  let hour = date.getHours();
  let second = date.getSeconds();

  if (min < 10) min = '0' + String(min);
  if (hour < 10) hour = '0' + String(hour);
  if (second < 10) second = '0' + String(second);


  convert_date.to_shamsi({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }, function(err, jalali) {

    if (err) {
      return cb(err);
    }

    cb(null, {
      date: jalali.year + "/" + jalali.month + "/" + jalali.day,
      time: hour + ":" + min + ":" + second,
      second_less_time: hour + ":" + min
    })
  });
}

// export it
module.exports = date_to_persian;
