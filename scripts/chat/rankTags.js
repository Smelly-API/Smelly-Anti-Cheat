import { World, Commands } from "Minecraft"
import { getTags, runCommand } from "../includes/functions.js"


export function beforeChat(data) {
    data.canceled = true
    var message = data.message
    message = message.replace(/(\n|\")/g, "")
    const sender = data.sender
    const sendToTargets = data.sendToTargets
    const targets = data.targets


    // Message is not a /msg
    if (!sendToTargets) {
        const tags = getTags(sender.name)
        let rank
        for (const tag of tags) {
            if (tag.startsWith('rank:')) {
                rank = tag.replace('rank:', '')
            }
        }
        if (rank == undefined) rank = "§bMember"
        runCommand(`tellraw @a {"rawtext":[{"text":"§8[§r${rank}§r§8] §7${sender.name}:§r ${message}"}]}`)
    } else {

    }
}