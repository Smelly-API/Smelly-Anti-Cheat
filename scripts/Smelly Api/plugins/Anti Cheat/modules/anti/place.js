import { world, MinecraftBlockTypes } from "mojang-minecraft";
import { CONFIGURATION } from "../../config";

/**
 * Minecraft Bedrock Anti Bad Blocks
 * @license MIT
 * @author Smell of curry
 * @version 1.0.0
 * --------------------------------------------------------------------------
 * This anti block place stops players from placing unwanted blocks
 * Simpliy when a player places a blocks it tests if that block is banned
 * And cancles that block from being placed, (add more blocks to list)
 * --------------------------------------------------------------------------
 */

/**
 * The Banned blocks
 * @type {Array<string>}
 */
const BANNED_BLOCKS = CONFIGURATION.BANNED_BLOCKS;

/**
 * The tag that bypasses this check
 * @type {string}
 */
const byPassTag = CONFIGURATION.BY_PASS_TAG;

world.events.blockPlace.subscribe(({ block, player }) => {
  if (player.hasTag(byPassTag)) return;
  if (BANNED_BLOCKS.includes(block.id)) block.setType(MinecraftBlockTypes.air);
});
