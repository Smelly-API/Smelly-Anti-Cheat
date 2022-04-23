import * as SA from "../../../index.js";
import { COMMAND_PATHS } from "./CommandBuilder.js";

new SA.build.Command(
  {
    name: "help",
    description: "Provides help/list of commands.",
    aliases: ["?", "h"],
  },
  (ctx) => {
    if (COMMAND_PATHS.length == 0) return ctx.reply(`No Commands Found`);
    let page = 1;
    const maxPages = Math.ceil(COMMAND_PATHS.length / 10);
    const arg = ctx.args[0];
    if (arg) {
      if (!isNaN(arg)) {
        page = parseInt(arg);
      } else {
        const cmd = COMMAND_PATHS.find((cmd) => cmd.path.includes(arg));
        if (!cmd) return ctx.reply(`The command ${arg} does not exist`);
        ctx.reply(`commands.help.command.aliases`, [
          cmd.name,
          cmd.aliases.join(", "),
        ]);
        ctx.reply(cmd.description);
        ctx.reply(`Usage: \n usage`);
        return;
      }
    }
    if (page > maxPages) page = maxPages;
    ctx.reply(`commands.help.header`, [page, maxPages]);
    for (const command of COMMAND_PATHS.slice(page * 10 - 10, page * 10)) {
      ctx.reply(`-${command.path.join(" ")} args`);
    }
  }
);
