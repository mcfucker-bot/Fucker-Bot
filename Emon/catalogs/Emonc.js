const a = require("chalk");
const b = require("gradient-string");
const c = require("chalkercli");
const d = b("blue", "purple");
const e = b("yellow", "lime", "green");
const f = b("#243aff", "#4687f0", "#5800d4");
const g = b("#0905ed", "#346eeb", "#344feb");
module.exports = (b, c) => {
  switch (c) {
    case "warn":
      process.stderr.write(d("warn - ") + b + "\n");
      break;
    case "error":
      process.stderr.write(a.bold.hex("#ff0000").bold("error - ") + b + "\n");
      break;
    case "load":
      process.stderr.write(f("new user - ") + b + "\n");
      break;
    default:
      process.stderr.write(g(String(c) + " - ") + b + "\n");
      break;
  }
};
module.exports.error = (b, c) => {
  process.stderr.write(a.hex("#ff0000")("error - ") + b + "\n");
};
module.exports.err = (b, c) => {
  process.stderr.write(a.hex("#ff0000")("error - ") + b) + "\n";
};
module.exports.warn = (b, c) => {
  process.stderr.write(a.yellow("warn - ") + b + "\n");
};
module.exports.loader = (b, c) => {
  switch (c) {
    case "warn":
      process.stderr.write(e("warn - ") + b + "\n");
      break;
    case "error":
      process.stderr.write(a.hex("#ff0000")("error - ") + b + "\n");
      break;
    default:
      process.stderr.write(f("emon - ") + b + "\n");
      break;
  }
};