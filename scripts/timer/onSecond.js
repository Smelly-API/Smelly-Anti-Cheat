import { World, Commands } from "Minecraft"

var second = 0

export function onSecond() {
    second++
    if (second >= 10) {
        Commands.run(`scoreboard objectives remove chatsSent`)
        Commands.run(`scoreboard objectives add chatsSent dummy`)
        Commands.run(`scoreboard players add @a chatsSent 0`)
        second = 0
    }
}