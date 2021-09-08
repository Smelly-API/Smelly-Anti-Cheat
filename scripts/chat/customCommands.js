import { World, Commands } from "Minecraft"
import { runCommand } from "../includes/functions.js"

export const commandPrefix = "-"

export function customCommand(command, msg) {
    if (command.split(" ")[0] == "tp") {
        runCommand(`execute "${msg.sender.name}" ~~~ execute @s[m=c] ~~~ tag @s add tpr`)
        runCommand(`execute "${msg.sender.name}" ~~~ execute @s[m=c] ~~~ ${command}`)
    }
}