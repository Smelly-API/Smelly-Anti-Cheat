import { world } from "mojang-minecraft";
import { SA } from "../../../../index.js";

world.events.beforeChat.subscribe((data) => {
  if (data.message.startsWith(SA.config.commands.PREFIX)) return;
  const muteData = SA.tables.db_mutes.get(data.sender.name);
  if (!muteData) return;
  if (muteData.expire && muteData.expire < Date.now())
    return SA.tables.db_mutes.delete(data.sender.name);
  data.cancel = true;
  SA.Providers.chat.broadcast(
    `You are muted and cannot send messages please try again later`,
    data.sender.nameTag
  );
});
