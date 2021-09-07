scoreboard players add @s combatlog 0
execute @s[scores={combatlog=1..}] ~~~ kill @s
execute @s[scores={combatlog=1..}] ~~~ tellraw @s {"rawtext":[{"text":" §l§bYou Were Combat Logged For §e"},{"score":{"name":"@s","objective":"combatlog"}}]}