// const EventEmitter = require("events");

// var url = "http://logger.io/logs";
// class Logger extends EventEmitter {
//   log(message) {
//     console.log(message);
//     this.emit("messageLogged", { id: 1, url: "http://" });
//   }
// }

// module.exports = Logger;
function log(req, res, next) {
  console.log("logging");
  next();
}
module.exports = log;
