import { Player } from "mojang-minecraft";
import { SA } from "../../../index.js";

export class Freeze {
  /**
   * Freeze a player
   * @param {Player} player
   * @param {string} reason
   */
  constructor(player, reason = "No Reason") {
    const data = {
      player: player.name,
      reason: reason,
      location: {
        x: player.location.x,
        y: player.location.y,
        z: player.location.z,
        dimension: player.dimension.id,
      },
    };
    SA.tables.db_freezes.set(player.name, data);
  }
}
