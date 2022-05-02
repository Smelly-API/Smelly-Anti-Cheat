import { BlockLocation, Location } from "mojang-minecraft";

/**
 * Turn text into colored text that supports MCBE
 * @param {string} text The text you want to format to rainbow colors.
 * @returns {string}
 * @example rainbowText('This is rainbow text!');
 */
function rainbowText(text) {
  const rainbowCode = [
    "§4",
    "§c",
    "§6",
    "§e",
    "§g",
    "§2",
    "§a",
    "§b",
    "§3",
    "§9",
    "§5",
    "§d",
  ];
  const letter = text.replace(/§./g, "").split("");
  let newMessage = "",
    rainbowIndex = 0;
  letter.forEach((letter) => {
    if (letter !== " ") {
      newMessage += `${rainbowCode[rainbowIndex]}${letter}`;
      rainbowIndex + 1 >= rainbowCode.length
        ? (rainbowIndex = 0)
        : rainbowIndex++;
    } else newMessage += " ";
  });
  return newMessage;
}
/**
 * This will display in text in thousands, millions and etc... For ex: "1400 -> "1.4k", "1000000" -> "1M", etc...
 * @param {number} number The number you want to convert
 * @returns {string}
 * @example metricNumbers(15000);
 */
function metricNumbers(value) {
  const types = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  const selectType = (Math.log10(value) / 3) | 0;
  if (selectType == 0) return value;
  let scaled = value / Math.pow(10, selectType * 3);
  return scaled.toFixed(1) + types[selectType];
}
/**
 * Will format your number. For ex: "1400" -> "1,400", "1000000" -> "1,000,000", etc...
 * @param {number} number The number you want to convert
 * @returns {string}
 * @example thousandsSeparator(15000);
 */
function thousandsSeparator(value) {
  if (typeof value !== "number") return;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
/**
 * Convert string to binary
 * @param {String} text you want to trasnslate to binary
 * @returns {String}
 */
function textToBinary(text) {
  return text
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(2);
    })
    .join(" ");
}
/**
 * Convert binary to string
 * @param {String} binary the binary that you want converted
 * @returns {String}
 */
function binaryToText(binary) {
  return binary
    .split(" ")
    .map((char) => {
      return String.fromCharCode(parseInt(char, 2));
    })
    .join("");
}
/**
 * Convert number to formated with k/m/b
 * @param {number} number The number you want to convert
 * @returns {number}
 */
function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num <= 999) {
    return num; // if value < 1000, nothing to do
  }
}
/**
 * Convert seconds to number like 0:00:00
 * @param {number} seconds The Ammount of seconds to convert
 * @returns {string}
 */
function convertHMS(value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
}
/**
 * Convert seconds to number like 0:00:00
 * @param {string} string The string you want to captliaze
 * @returns {string}
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Returns a location of the inputed aguments
 * @param {string} x x agument
 * @param {string} y y agument
 * @param {string} z z agument
 * @param {Array<number>} location player.location used
 * @param {Array<number>} viewVector player.viewVector used
 * @returns {Location}
 * @example parseLocationAugs(["~1", "3", "^7"], { location: [1,2,3] , viewVector: [1,2,3] })
 */
function parseLocationAugs([x, y, z], { location, viewVector }) {
  if (!x || !y || !x) return null;
  const a = [x, y, z].map((arg) => {
    const r = parseInt(arg.replace(/\D/g, ""));
    return isNaN(r) ? 0 : r;
  });
  const b = [x, y, z].map((arg, index) => {
    return arg.includes("~")
      ? a[index] + location[index]
      : arg.includes("^")
      ? a[index] + viewVector[index]
      : a[index];
  });
  return new BlockLocation(b[0], b[1], b[2]);
}

export {
  rainbowText,
  metricNumbers,
  thousandsSeparator,
  textToBinary,
  binaryToText,
  numFormatter,
  convertHMS,
  capitalizeFirstLetter,
  parseLocationAugs,
};
