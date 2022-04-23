import { BeforeChatEvent, world } from "mojang-minecraft";
import * as SA from "../../../index.js";
import { CommandCallback } from "./CommandCallback.js";
import { CommandOption } from "./CommandOption.js";

/** @type {Array<Command>} */
export const COMMAND_PATHS = [];

/**
 * Returns the acuall command that was used
 * @param {BeforeChatEvent} data chat data that was used
 * @returns {Command}
 * @example this.getChatCommand(BeforeChatEvent)
 */
function getChatCommand(data) {
  const args = getChatAugments(data);
  let checker = (arr, target) => target.every((v, index) => v === arr[index]);
  let command = null;
  for (const cmd of COMMAND_PATHS) {
    if (checker(args, cmd.path)) command = cmd;
    for (const aliase of cmd.aliases) {
      let newPath = [...cmd.path];
      newPath[0] = aliase;
      if (checker(args, newPath)) command = cmd;
    }
  }
  return command;
}

/**
 * Returns a Before chat events augments
 * @param {BeforeChatEvent} data chat data that was used
 * @returns {Array<string>}
 * @example this.getChatAugments(BeforeChatEvent)
 */
function getChatAugments(data) {
  return data.message
    .slice(SA.prefix.length)
    .trim()
    .match(/"[^"]+"|[^\s]+/g)
    .map((e) => e.replace(/"(.+)"/, "$1").toString());
}

world.events.beforeChat.subscribe((data) => {
  try {
    if (!data.message.startsWith(SA.prefix)) return;
    let args = getChatAugments(data);
    const command = getChatCommand(data);
    if (!command)
      return SA.build.chat.broadcast(
        `commands.generic.unknown`,
        data.sender.nameTag,
        [`§f${command}§c`]
      );
    data.cancel = true;
    args.shift();
    args = args.filter((el) => !command.path.includes(el)); // removes command and subcommands from path
    for (const [index, option] of command.options.entries()) {
      if (option.verify(args[index])) continue;
      return SA.build.chat.broadcast(
        `commands.generic.parameter.invalid`,
        data.sender.nameTag,
        [args[index]]
      );
    }
    command.sendCallback(data, args);
  } catch (error) {
    console.warn(`${error} : ${error.stack}`);
    data.cancel = false;
  }
});

export class Command {
  /**
   * Register a command
   * @param {Object} CommandInfo description
   * @param {string} CommandInfo.name name of the command
   * @param {string} CommandInfo.description name of the command
   * @param {Array<string>} CommandInfo.aliases other names for the command
   * @param {Array<string>} CommandInfo.tags required tags to use command
   * @param {Array<string>} CommandInfo.path a path of all the command it runs through ["maincommand", "firstsubcommand", "second subcommand"]
   * @param {function(CommandCallback):CommandCallback} callback Code you want to execute when the command is executed
   * @returns {void}
   * @example new CommandBuilder({ name: "good", description: "subcommand for worldedit" }, callback)
   */
  constructor(CommandInfo, callback) {
    this.name = CommandInfo.name.toString().toLowerCase();
    this.description = CommandInfo.description;
    this.aliases = CommandInfo.aliases ?? [];
    this.tags = CommandInfo.tags ?? [];
    this.path = CommandInfo.path ?? [this.name];
    this.options = [];
    this.callback = callback;

    // adds a new path to the stored global paths
    COMMAND_PATHS.push(this);
  }
  /**
   * Register a subCommand for this command
   * @param {Object} SubCommandInfo description
   * @param {string} SubCommandInfo.name name of the command
   * @param {string} SubCommandInfo.description name of the command
   * @param {Array<string>} SubCommandInfo.tags required tags to use command
   * @param {function(CommandCallback):CommandCallback} callback Code you want to execute when the command is executed
   * @example command.addSubCommand({ name: "good", description: "subcommand for worldedit" }, callback)
   */
  addSubCommand(SubCommandInfo, callback) {
    const newPath = [...this.path];
    newPath.push(SubCommandInfo.name);
    const subCommand = new Command(
      {
        name: SubCommandInfo.name,
        description: SubCommandInfo.description,
        tags: SubCommandInfo.tags,
        path: newPath,
      },
      callback
    );
    return subCommand;
  }

  /**
   * Registers a Usage option for a command
   * @param {string} name name of the option
   * @param {string} type type number of option type
   * @param {string} description description of the option
   * @returns {void}
   * @example command.addOption("amount", "int",  "The amount of items to drop")
   */
  addOption(name, type, description) {
    this.options.push(new CommandOption(name, type, description));
  }
  /**
   * Returns a commands name
   * @returns {string}
   * @example this.getName()
   */
  getName() {
    return this.name;
  }
  /**
   * Returns a commands callback
   * @param {BeforeChatEvent} data chat data that was used
   * @param {Array<string>} args aguments used this will exclude command name and subcommand name
   * @returns {void}
   * @example this.sendCallback(BeforeChatEvent, ["2", "sd"])
   */
  sendCallback(data, args) {
    this.callback(new CommandCallback(data, args));
  }
}
