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
  constructor(name, type, description) {
    this.name = name;
    this.type = type;
    this.description = description;
  }

  verify(value) {
    switch (type) {
      case "int":
        return isInt(value);
      case "location":
        break;
      case "string":
        return true;
      case "float":
        return isFloat(value);
      default:
        return true;
    }
  }
}
