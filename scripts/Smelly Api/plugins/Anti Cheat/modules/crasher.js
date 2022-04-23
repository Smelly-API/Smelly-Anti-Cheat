import { Location, world } from "mojang-minecraft";

world.events.tick.subscribe((tick) => {
  for (const player of world.getPlayers()) {
    if (
      Math.abs(player.location.x) > 30000000 ||
      Math.abs(player.location.y) > 30000000 ||
      Math.abs(player.location.z) > 30000000
    ) {
      player.teleport(new Location(0, 0, 0), "overworld", 0, 0);
    }
  }
});
