import { Player } from "mojang-minecraft";
import { db_bans } from "../index.js";
import * as SA from "../../../index.js";

export class Ban {
  /**
   * Ban a player for a set length
   * @param {Player.nameTag} player
   * @param {number} length
   * @param {string} unit
   * @param {string} reason
   * @param {Player.nameTag} by
   */
  constructor(
    player,
    length = null,
    unit = null,
    reason = "No Reason",
    by = "Smelly Anti Cheat"
  ) {
    length = length ? SA.untils.MS(`${length} ${unit}`) : null;
    const data = {
      player: player,
      date: Date.now(),
      length: length,
      unban_date: length ? length + Date.now() : null,
      reason: reason,
      banned_by: by,
    };
    db_bans.set(player, data);
  }
}
