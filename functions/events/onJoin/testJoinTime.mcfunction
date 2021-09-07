scoreboard objectives add jointime dummy
scoreboard players add @s jointime 1

execute @s[scores={jointime=..1}] ~~~ function events/onJoin/first/onJoin
execute @s[scores={jointime=..1}] ~~~ function events/onJoin/many/onJoin
execute @s[scores={jointime=2..}] ~~~ function events/onJoin/many/onJoin