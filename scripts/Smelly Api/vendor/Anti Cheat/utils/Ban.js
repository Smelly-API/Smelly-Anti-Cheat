import { Player } from "mojang-minecraft";
import { SA } from "../../../index.js";

export class Ban {
  /**
   * Ban a player for a set length
   * @param {Player.name} player
   * @param {number} length
   * @param {string} unit
   * @param {string} reason
   * @param {Player.name} by
   */
  constructor(
    player,
    length = null,
    unit = null,
    reason = "No Reason",
    by = "Smelly Anti Cheat"
  ) {
    length = length ? SA.Utilities.format.MS(`${length} ${unit}`) : null;
    const data = {
      player: player,
      date: Date.now(),
      length: length,
      expire: length ? length + Date.now() : null,
      reason: reason,
      by: by,
    };
    SA.tables.db_bans.set(player, data);
  }
}
