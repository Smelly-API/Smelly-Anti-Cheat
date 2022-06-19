import { world } from "mojang-minecraft";
import { SA } from "../../../index.js";
import { STAFF_TAG } from "../config.js";
import { PlayerLog } from "../utils/PlayerLog.js";

/**
 * Minecraft Bedrock Anti Nuker
 * @license MIT
 * @author Smell of curry
 * @version 1.0.0
 * --------------------------------------------------------------------------
 * This anti nuker works by loging everytime a player breaks a block
 * Then the next time they break a block it tests the time from now to then
 * And if they broke a block in 50 miliseconds than we place that block back
 * --------------------------------------------------------------------------
 */

/**
 * The log of the players break times
 */
const log = new PlayerLog();

/**
 * When breaking vegitation blocks it could cause a false trigger
 * so when a block gets broken and it has one of the block tags
 * it gets skipped and doesnt count in the nuker event
 *
 * @link https://wiki.bedrock.dev/blocks/block-tags.html
 */
const TAGS = [
  "snow",
  "lush_plants_replaceable",
  "azalea_log_replaceable",
  "minecraft:crop",
  "fertilize_area",
];

/**
 * A list of all the blocks that are impossible to break unless you have hacks
 */
const IMPOSSIBLE_BREAKS = [
  "minecraft:water",
  "minecraft:flowing_water",
  "minecraft:lava",
  "minecraft:flowing_lava",
  "minecraft:bedrock",
];

world.events.blockBreak.subscribe(
  ({ block, brokenBlockPermutation, dimension, player }) => {
    if (player.hasTag(STAFF_TAG)) return;
    if (block.getTags().some((tag) => TAGS.includes(tag))) return;
    const old = log.get(player);
    log.set(player, Date.now());
    if (old < Date.now() - 50 || IMPOSSIBLE_BREAKS.includes(block.id)) return;
    dimension
      .getBlock(block.location)
      .setPermutation(brokenBlockPermutation.clone());
    SA.Utilities.time.setTickTimeout(() => {
      dimension
        .getEntitiesAtBlockLocation(block.location)
        .filter((entity) => entity.id === "minecraft:item")
        .forEach((item) => item.kill());
    }, 2);
  }
);
