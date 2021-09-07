## THIS FILE IS RUN BY PLAYER.JSON EVERY PERSON IS ON A DIFFRENT LOOP SO TIME WILL VE DIFFRENT FOR EACH PERSON BUT WILL BE A EXZACT SECOND

scoreboard objectives add second dummy
scoreboard players add @s second 1
execute @s[scores={second=20..}] ~~~ function timers/second/onSecond
execute @s[scores={second=20..}] ~~~ scoreboard players set @s second 0