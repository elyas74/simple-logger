//
//
//

const fs = require('fs');
const path = require('path');
const date_to_persian = require('./date/to_persian');
const colors = require('colors');

console.original_log = console.log;
console.original_error = console.error;

// export my logger
console.log = log;
console.error = error;
console.security = security;
console.open = open;

// implementing functions
function error(log_string) {
  console.log(log_string, {
    type: "error",
    color: "red"
  });
};

function security(log_string) {
  console.log(log_string, {
    type: "security",
    color: "yellow"
  });
};

function log(log_string, option) {

  option = option || {};

  type = option.type || "info";
  color = option.color || "green";

  string_date(function(date_string) {

    date_string += " (" + type + ")" + " -> ";

    // print it
    if (type == "error") {

      // this will log it in stderr
      console.original_error(date_string[color] + log_string);
    } else {

      // this will log it in sdtout
      console.original_log(date_string[color] + log_string);
    }

    // save it to file
    file_log(date_string + log_string + "\n", type);
  });
};

// console.dir do someting like this
function open(log_string) {

  string_date(function(date_string) {
    date_string += " (open) -> ";
    console.original_log(date_string.blue + JSON.stringify(log_string, null, "    "));
  });
};


function file_log(log, type, just_file) {

  type = type || "info";

  let d = new Date();

  let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();

  let file_name = d.getFullYear() + '-' + month + '-' + day;

  fs.appendFile(path.join(__dirname, "/logs/" + file_name + ".log"), log, function(err) {
    if (err) {
      return console.original_error(err);
    }
  });
}

// generate a string contain date for begining of log
function string_date(cb) {

  cb = cb || function() {};

  date_to_persian(new Date(), function(err, date) {
    let d = "";
    d += date.date.substring(2) + " " + date.time;
    cb(d);
  });
}
