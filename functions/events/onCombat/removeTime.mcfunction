## THIS FILE IS RUN EVERY SECOND BY THE PLAYER FROM "timers/second/secondman"

scoreboard objectives add combatlog dummy
scoreboard players add @s combatlog 0
execute @s[scores={combatlog=1..}] ~~~ scoreboard players remove @s combatlog 1