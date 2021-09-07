import { World, Commands } from "Minecraft"

export function hasTag(target, testtag) {
    const command = runCommand(`tag "${target}" list`)
    const raw = command.statusMessage.split(' ')
    const tags = []
    for (const string of raw) {
        if (string.startsWith("§a")) tags.push(string.replace('§a', '').replace('§r', '').replace(',', ''))
    }
    if (tags.includes(testtag)) {
        return true
    } else {
        return false
    }

}

export function ban(target, reason = "None Provided", time = "perm") {
    runCommand(`kick "${target}" You Have Been Banned!\nReason: ${reason}\nExpiery: ${time}\nAppeal At: Discord`)
}


export function getTags(target) {
    const command = runCommand(`tag "${target}" list`)
    const raw = command.statusMessage.split(' ')
    const tags = []
    for (const string of raw) {
        if (string.startsWith("§a")) tags.push(string.replace('§a', '').replace('§r', '').replace(',', ''))
    }

    return tags
}

export function getScore(objective, player, { minimum, maximum } = {}) {
    const data = runCommand(`scoreboard players test "${player}" ${objective} ${minimum ? minimum : '*'} ${maximum ? maximum : '*'}`);
    if (!data.statusMessage) return;
    return parseInt(data.statusMessage.match(/-?\d+/)[0]);
};

export function getDistanceX(target, oldX) {
    const playerX = Math.round(target.location.x)
    const distanceX = Math.abs(playerX - oldX)
    return distanceX
};

export function getDistanceY(target, oldY) {
    const playerY = Math.round(target.location.y)
    const distanceY = Math.abs(playerY - oldY)
    return distanceY
};

export function getDistanceZ(target, oldZ) {
    const playerZ = Math.round(target.location.z)
    const distanceZ = Math.abs(playerZ - oldZ)
    return distanceZ
};

export function runCommand(command) {
    try {
        return { error: false, ...Commands.run(command) };
    } catch(error) {
        return { error: true };
    };
};