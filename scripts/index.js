import { World } from "Minecraft"
import { customCommand, commandPrefix } from "./chat/customCommands.js"
import { beforeChat } from "./chat/rankTags.js"
import { antiSpam } from "./chat/antiSpam.js"
import { onSecond } from "./timer/onSecond.js"
import { antiFly } from "./anticheat/antiFly.js"
import { setTickInterval } from "./timer/scheduling.js"

setTickInterval(() => {
    onSecond();
    for(const player of World.getPlayers()) antiFly(player);
}, 20); //Executes the stuff in between every 1 second

World.events.beforeChat.subscribe(msg => {
    if (msg.message.substr(0, commandPrefix.length) == commandPrefix) {
        msg.canceled = true
        customCommand(`${msg.message.substr(commandPrefix.length, msg.message.length - 1)}`, msg)
    } else {
        if (!antiSpam(msg)) {
            beforeChat(msg)
        }
    }
})