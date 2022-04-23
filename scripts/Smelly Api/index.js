import { world } from "mojang-minecraft";
import { configuration } from "./config.js";

export const prefix = configuration.PREFIX;
export const version = configuration.VERSION;

export const config = configuration;

let currentPing = 0;
world.events.tick.subscribe(({ currentTick, deltaTime }) => {
  currentPing = 1 / deltaTime;
});
/**
 * Gets the ping of the server
 * @returns {Promise<number>}
 */
export async function getPing() {
  return currentPing;
}

//modules
export { build, untils, tables } from "./modules/index.js";

// Plugins
import "./plugins/index.js";
