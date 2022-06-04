import { SA } from "../../../../index.js";
import { STAFF_TAG } from "../../config.js";

new SA.Command({
  name: "unban",
  description: "Unban a banned player",
  tags: [STAFF_TAG],
})
  .addOption("player", "string", "Player to ban")
  .executes((ctx, { player }) => {
    if (!SA.tables.db_bans.has(player))
      return ctx.reply(`${player} is not banned`);

    SA.tables.db_bans.delete(player);
    ctx.reply(`§a${player}§r has been Unbanned!`);
  });
