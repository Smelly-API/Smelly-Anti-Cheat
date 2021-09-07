import { World, Commands } from "Minecraft"
import { runCommand } from "../includes/functions.js"

var second = 0

export function onSecond() {
    second++
    if (second >= 10) {
        runCommand(`scoreboard objectives add chatsSent dummy`)
        runCommand(`scoreboard objectives remove chatsSent`)
        runCommand(`scoreboard objectives add chatsSent dummy`)
        runCommand(`scoreboard players add @a chatsSent 0`)
        second = 0
    }
}