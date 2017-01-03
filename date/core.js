//
//
//

const jalali = require('jalaali-js');

function to_shamsi(date_obj, cb) {

  cb = cb || function() {};

  if (!date_obj.year || !date_obj.month || !date_obj.day) {
    return cb(new Error('low args'));
  }

  let temp_date = jalali.toJalaali(
    Number(date_obj.year),
    Number(date_obj.month),
    Number(date_obj.day)
  );

  cb(null, {
    year: temp_date.jy,
    month: temp_date.jm,
    day: temp_date.jd
  });

};

module.exports.to_shamsi = to_shamsi;
