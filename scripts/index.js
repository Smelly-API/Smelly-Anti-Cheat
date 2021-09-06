import { World, Commands } from "Minecraft"
import { checkTags } from "./anticheat/tagManager.js"
import { customCommand, commandPrefix } from "./chat/customCommands.js"
import { beforeChat } from "./chat/rankTags.js"
import { antiSpam } from "./chat/antiSpam.js"
import { onSecond } from "./timer/onSecond.js"
import { antiFly } from "./anticheat/antiFly.js"

var tick = 0

//Checks if a command was run (checks for the prefix)
World.events.tick.subscribe(tickper => {
    tick++
    if (tick >= 20) {
        onSecond()
        tick = 0
    }
    antiFly()
})

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