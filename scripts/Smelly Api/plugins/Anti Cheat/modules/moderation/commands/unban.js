import { db_bans } from "../../../index.js";
import * as SA from "../../../../../index.js";
import { CONFIGURATION } from "../../../config.js";

new SA.build.Command({
  name: "unban",
  description: "Unban a banned player",
  tags: [CONFIGURATION.BY_PASS_TAG],
})
  .addOption("player", "string", "Player to ban")
  .executes((ctx, { player }) => {
    if (!db_bans.has(player)) return ctx.reply(`${player} is not banned`);
    db_bans.delete(player);
    ctx.reply(`§a${player}§r has been Unbanned!`);
  });
