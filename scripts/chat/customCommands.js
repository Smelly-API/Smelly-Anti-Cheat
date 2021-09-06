import { World, Commands } from "Minecraft"

export const commandPrefix = "-"

export function customCommand(command, msg) {
    if (command.split(" ")[0] == "tp") {
        Commands.run(`execute "${msg.sender.name}" ~~~ tag @s add tpr`)
        Commands.run(`execute "${msg.sender.name}" ~~~ ${command}`)
    }
}