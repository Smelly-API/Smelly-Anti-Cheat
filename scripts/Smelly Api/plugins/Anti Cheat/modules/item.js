import {
  ItemStack,
  Items,
  world,
  MinecraftEnchantmentTypes,
} from "mojang-minecraft";
import { CONFIGURATION } from "../config";

const allEnchantments = Object.values(MinecraftEnchantmentTypes);

world.events.tick.subscribe(() => {
  for (const player of world.getPlayers()) {
    let inventory = player.getComponent("minecraft:inventory").container;
    for (let i = 0; i < inventory.size; i++) {
      let item = inventory.getItem(i);
      if (!item) continue;
      if (CONFIGURATION.BANNED_ITEMS.includes(item.id)) {
        inventory.setItem(i, new ItemStack(Items.get("minecraft:air"), 0, 0));
      }
      const itemEnchantments = item.getComponent("enchantments").enchantments;
      for (let ench of allEnchantments) {
        let enchLvl = itemEnchantments.hasEnchantment(ench);
        if (enchLvl > ench.maxLevel) {
          itemEnchantments.removeEnchantment(ench);
        }
      }
    }
  }
});
