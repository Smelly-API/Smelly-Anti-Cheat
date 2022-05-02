import { BeforeChatEvent, ItemStack } from "mojang-minecraft";
import * as SA from "../../../index.js";

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

export class CommandOption {
  /**
   * Registers a command option
   * @param {BeforeChatEvent} data chat data that was used
   * @param {Array<string>} args aguments used this will exclude command name and subcommand name
   * @example new CommandCallback(BeforeChatEvent, ["2", "sd"])
   */
  constructor(name, type, description, optional) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.optional = optional;
  }
  /**
   * Verifys the string to see if it meets the critera of the type
   * @param {string} value
   * @returns {Boolean}
   */
  verify(value) {
    if (value == "" || value == undefined || value == null) return false;
    switch (this.type) {
      case "int":
        return !isNaN(value);
      case "location":
        return value.match(/^(\~\d*|\^\d*|\d*)$/) ? true : false;
      case "boolean":
        return value.match(/^(true|false)$/) ? true : false;
      case "float":
        return isFloat(value);
      case "player":
        return SA.build.world.has(value);
      case "target":
        return value.match(/^(@.|"\S+")$/) ? true : false;
      case Array.isArray(this.type):
        return this.type.includes(value);
      default:
        // string
        return value;
    }
  }
  /**
   * Validates the arg and returns the parsed value
   * @param {string} value
   * @returns {number | Location | boolean | string}
   */
  validate(value) {
    switch (this.type) {
      case "int":
        return parseInt(value);
      case "boolean":
        return value == "true" ? true : false;
      case "float":
        return parseFloat(value);
      case "target":
        return value.match(/^(@.|"\S+")$/)[0];
      default:
        // string
        return value;
    }
  }
}
