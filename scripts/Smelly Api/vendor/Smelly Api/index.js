import { BlockLocation, world } from "mojang-minecraft";
import { COMMAND_PATHS } from "../../app/Contracts/Commands/Command.js";
import { SA } from "../../index.js";

new SA.Command(
  {
    name: "version",
    description: "Get Current Version",
    aliases: ["v"],
  },
  (ctx) => {
    ctx.reply(`Current Smelly API Version: ${SA.version}`);
  }
);

new SA.Command(
  {
    name: "test",
    description: "Test command",
  },
  (ctx) => {
    try {
      console.warn("Smelly API is workin and configured properly!");
      ctx.reply(`Smelly API is workin and configured properly!`);
    } catch (error) {
      console.warn(error + error.stack);
    }
  }
);

new SA.Command(
  {
    name: "ping",
    description: "Returns the current TPS of the servers ping",
  },
  (ctx) => {
    let pingTick = world.events.tick.subscribe(({ currentTick, deltaTime }) => {
      SA.Providers.chat.broadcast(`Pong! Current TPS: ${1 / deltaTime}`);
      world.events.tick.unsubscribe(pingTick);
    });
  }
);

new SA.Command(
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
        ctx.reply(`Usage: \n`);
        for (const command of COMMAND_PATHS.filter(
          (c) => c.path[0] == ctx.args[0]
        )) {
          const options = command.options.map(
            (option) =>
              `${option.optional ? "[" : "<"}${option.name}: ${option.type}${
                option.optional ? "]" : ">"
              }`
          );
          ctx.reply(`-${command.path.join(" ")} ${options.join(" ")}`);
        }
        return;
      }
    }
    if (page > maxPages) page = maxPages;
    ctx.reply(`commands.help.header`, [page, maxPages]);

    for (const command of COMMAND_PATHS.slice(page * 10 - 10, page * 10)) {
      const options = command.options.map(
        (option) =>
          `${option.optional ? "[" : "<"}${option.name}: ${option.type}${
            option.optional ? "]" : ">"
          }`
      );
      ctx.reply(`-${command.path.join(" ")} ${options.join(" ")}`);
    }
  }
);

// new SA.Command({
//   name: "save",
// })
//   .addOption(`key`, "string", "saves a key to a value")
//   .addOption(`value`, "string", "value of the key")
//   .executes((ctx, { key, value }) => {
//     SA.tables.db_factions.set(key, value);
//   });

// new SA.Command({
//   name: "get",
// })
//   .addOption(`key`, "string", "key to get")
//   .executes((ctx, { key }) => {
//     ctx.reply(SA.tables.db_factions.get(key));
//   });
