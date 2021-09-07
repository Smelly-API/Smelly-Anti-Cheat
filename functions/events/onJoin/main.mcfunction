scoreboard objectives add join dummy
scoreboard players add @a join 0

execute @a[scores={join=0}] ~~~ function events/onJoin/testJoinTime

scoreboard objectives remove join
scoreboard objectives add join dummy
scoreboard players set @a join 1