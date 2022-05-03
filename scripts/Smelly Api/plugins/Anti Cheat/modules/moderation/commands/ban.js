import * as SA from "../../../../../index.js";
import { CONFIGURATION } from "../../../config.js";
import { db_bans } from "../../../index.js";
import { Ban } from "../../../utils/Ban.js";

new SA.build.Command({
  name: "ban",
  description: "Ban players for lengths",
  tags: [CONFIGURATION.BY_PASS_TAG],
})
  .addOption("player", "player", "Player to ban")
  .addOption("length", "int", "Time ammount to ban")
  .addOption("unit", "string", "The unit for the time")
  .addOption("reason", "string", "reason for ban", true)
  .executes((ctx, { player, length, unit, reason }) => {
    new Ban(player, length, unit, reason, ctx.sender.nameTag);
    ctx.reply(
      `§cBanned §f"§a${player}§f" §cfor ${length} ${unit} Because: "${
        reason ?? "No reason Provided"
      }" §aSuccessfully`
    );
  });
