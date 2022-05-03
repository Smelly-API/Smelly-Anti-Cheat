import { world } from "mojang-minecraft";
import * as SA from "../../../../index.js";
import { CONFIGURATION } from "../../config.js";
import { Ban } from "../../utils/Ban.js";

/**
 * Minecraft Bedrock Anti Crasher
 * @license MIT
 * @author Smell of curry
 * @version 1.0.0
 * --------------------------------------------------------------------------
 * This anti crasher works by testing if a player has reached a location
 * Horion's crasher teleports the player to 30 Million so we just test for
 * That location and if they are there we kick the player (USES: player.json)
 * --------------------------------------------------------------------------
 */

/**
 * The tag that bypasses this check
 * @type {string}
 */
const byPassTag = CONFIGURATION.BY_PASS_TAG;

world.events.tick.subscribe((tick) => {
  for (const player of world.getPlayers()) {
    if (player.hasTag(byPassTag)) return;
    if (
      Math.abs(player.location.x) > 30000000 ||
      Math.abs(player.location.y) > 30000000 ||
      Math.abs(player.location.z) > 30000000
    ) {
      new Ban(player.nameTag, null, null, "Hacking: Crasher");
    }
  }
});
