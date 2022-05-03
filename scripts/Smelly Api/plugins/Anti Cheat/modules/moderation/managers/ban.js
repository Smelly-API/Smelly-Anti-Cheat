import { world } from "mojang-minecraft";
import { db_bans } from "../../../index.js";
import * as SA from "../../../../../index.js";
import { CONFIGURATION } from "../../../config.js";

world.events.tick.subscribe((tick) => {
  try {
    for (const player of world.getPlayers()) {
      const banData = db_bans.get(player.nameTag);
      if (!banData) return;
      if (banData.unban_date && banData.unban_date < Date.now())
        return db_bans.delete(player);
      player.runCommand(
        `kick "${player.nameTag}" §r
        §cYou have been banned!
        §aReason: §f${banData.reason}
        §fExpiry: §b${
          banData.unban_date ? SA.untils.MS(banData.length) : "Forever"
        }
        §fAppeal at: §b${CONFIGURATION.APPEAL_LINK}`
      );
      player.triggerEvent("binocraft:kick");
    }
  } catch (error) {
    console.warn(error + error.stack);
  }
});
