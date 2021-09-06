var time = 0
function testingStuff() {
    Commands.run(`say hey`)
    time++
    for (const player of World.getPlayers()) {
        let x
        if (Math.trunc(player.location.x) > 0) {
            x = Math.abs(Math.trunc(player.location.x))
        } else {
            x = '181' + Math.abs(Math.trunc(player.location.x))
        }
        if (time >= 20) {
            Commands.run(`execute "${player.name}" ~~~ scoreboard players set @s x_old ${x}`)
            time = 0
        }
        Commands.run(`execute "${player.name}" ~~~ execute @s[scores={x_old=${x + 20}..}] ~~~ say hacking`)
    }
}

function getObjectiveValue(target, objective) {
    const command = Commands.run(`scoreboard players list "${target}"`)
    const raw = command.statusMessage.split(' ')
    const objectives = []
    for (const string of raw) {
        if (string.startsWith("§a")) tags.push(string.replace('§a', '').replace('§r', '').replace(',', '').replace('- ', '').replace(objective, '').replace('()', ''))
    }
    Commands.run(`say hey`)
    return objective
}

function velocity () {
    const voly = Math.abs(player.velocity.y.toFixed(2))
    if (voly == 0.22 || voly == 0.23) {
        if (time >= 5) {
            Commands.run(`say ${player.name} hacking ${voly}`)
            time = 0
        }
    }
}