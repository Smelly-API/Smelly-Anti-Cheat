import { Location, world } from "mojang-minecraft";
import { SA } from "../../../../index.js";

world.events.tick.subscribe((tick) => {
  try {
    for (const player of world.getPlayers()) {
      const freezeData = SA.tables.db_freezes.get(player.name);
      if (!freezeData) return;
      player.teleport(
        new Location(
          freezeData.location.x,
          freezeData.location.y,
          freezeData.location.z
        ),
        world.getDimension(freezeData.location.dimension),
        0,
        0
      );
    }
  } catch (error) {
    console.warn(error + error.stack);
  }
});
