import { World, Commands } from "Minecraft"
import { getDistanceX, getDistanceY, getDistanceZ, hasTag, runCommand } from "../includes/functions.js"

const playersOldX = new Map();
const playersOldY = new Map();
const playersOldZ = new Map();
var time = 0

export function antiFly() {
  time++
  for (const player of World.getPlayers()) {
    if (time >= 20) {
        const playerX = parseInt(Math.round(player.location.x))
        const playerY = parseInt(Math.round(player.location.y))
        const playerZ = parseInt(Math.round(player.location.z))
        if (playersOldX.get(player.name) && playersOldY.get(player.name) && playersOldZ.get(player.name)) {
            const oldX = parseInt(playersOldX.get(player.name))
            const oldY = parseInt(playersOldY.get(player.name))
            const oldZ = parseInt(playersOldZ.get(player.name))

            const distanceX = parseInt(getDistanceX(player, oldX))
            const distanceZ = parseInt(getDistanceZ(player, oldZ))

            if (distanceX > 20 || distanceZ > 20) {
              runCommand(`execute "${player.name}" ~~~ event entity @s antiCheat:antiFly`)
              const flyHackingTag = hasTag(player.name, "flyHacking")
              if (flyHackingTag) {
                runCommand(`execute "${player.name}" ~~~ execute @s[m=!c] ~~~ tp @s ${oldX} ${oldY - 1} ${oldZ}`)
                runCommand(`execute "${player.name}" ~~~ tag @s remove flyHacking`)
                runCommand(`execute "${player.name}" ~~~ tag @s remove tpr`)
              }
            }
        }
        playersOldX.set(player.name, playerX);
        playersOldY.set(player.name, playerY);
        playersOldZ.set(player.name, playerZ);
        time = 0
    }
  }
}