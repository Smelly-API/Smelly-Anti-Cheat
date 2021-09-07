## THIS FILE IS RUN BY player.json ON COMBAT

scoreboard objectives add combatlog dummy
scoreboard players set @s combatlog 10
tellraw @s {"rawtext":[{"text":"§l§bYou Are Combat Logged For §e"},{"score":{"name":"@s","objective":"combatlog"}},{"text":"§l§b(s)"}]}