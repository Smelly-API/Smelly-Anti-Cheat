import { Player, world } from "mojang-minecraft";
import { CONFIGURATION } from "../../config";

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
 * @type {Object<Player.name: number>}
 */
const log = {};

/**
 * The tag that bypasses this check
 * @type {string}
 */
const byPassTag = CONFIGURATION.BY_PASS_TAG;

world.events.blockBreak.subscribe(
  ({ block, brokenBlockPermutation, dimension, player }) => {
    const old = log[player.name];
    log[player.name] = Date.now();
    if (old < Date.now() - 50 || player.hasTag(byPassTag)) return;
    dimension
      .getBlock(block.location)
      .setPermutation(brokenBlockPermutation.clone());
    dimension
      .getEntitiesAtBlockLocation(block.location)
      .filter((entity) => entity.id === "minecraft:item")
      .forEach((item) => item.kill());
  }
);

world.events.playerLeave.subscribe((data) => delete log[data.playerName]);
