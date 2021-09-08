import { getDistanceX, getDistanceZ, hasTag, runCommand } from "../includes/functions.js"

const playersOldCoordinates = new Map();

export function antiFly(player) {
    const playerX = Math.trunc(player.location.x);
    const playerY = Math.trunc(player.location.y);
    const playerZ = Math.trunc(player.location.z);
    playersOldCoordinates.set(player.nameTag, { x: playerX, y: playerY, z: playerZ });

    const playerCoords = playersOldCoordinates.get(player.nameTag);
    let oldX = playerCoords.x, oldY = playerCoords.y, oldZ = playerCoords.z;

    const distanceX = getDistanceX(player, oldX);
    const distanceZ = getDistanceZ(player, oldZ);

    if(distanceX > 20 || distanceZ > 20) {
        runCommand(`execute "${player.name}" ~~~ event entity @s antiCheat:antiFly`);
        const flyHackingTag = hasTag(player.name, "flyHacking");
        if(flyHackingTag) {
            runCommand(`execute "${player.name}" ~~~ execute @s[m=!c] ~~~ tp @s ${oldX} ${oldY - 1} ${oldZ}`);
            runCommand(`execute "${player.name}" ~~~ tag @s remove flyHacking`);
            runCommand(`execute "${player.name}" ~~~ tag @s remove tpr`);
        };
    };
};