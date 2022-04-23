import { BeforeChatEvent, ItemStack } from "mojang-minecraft";
import * as SA from "../../../index.js";

export class CommandCallback {
  /**
   * Returns a commands callback
   * @param {BeforeChatEvent} data chat data that was used
   * @param {Array<string>} args aguments used this will exclude command name and subcommand name
   * @example new CommandCallback(BeforeChatEvent, ["2", "sd"])
   */
  constructor(data, args) {
    this.data = data;
    this.args = args;
    this.sender = data.sender;
  }
  /**
   * Replys to the sender of a command callback
   * @param {string} text Message or a lang code
   * @param {Array<string>} args lang arguments
   * @example ctx.reply('Hello World!');
   */
  reply(text, args = []) {
    SA.build.chat.broadcast(text, this.sender.nameTag, args);
  }
  /**
   * Replys to the sender that a error has occured
   * @param {string} arg Parameter that was invalid
   * @example ctx.invalidArg('player');
   */
  invalidArg(arg) {
    SA.build.chat.broadcast(
      `commands.generic.parameter.invalid`,
      this.sender.nameTag,
      [arg]
    );
  }
    /**
   * Gives the sender a item
   * @param {ItemStack} item Item to give
   * @param {number} amount ammount to give
   * @param {number} data data of item
   * @example ctx.give('sword 10 2');
   */
  give(item) {
    SA.build.entity.giveItem(this.sender, item)
  }
}
