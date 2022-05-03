import {
  ItemStack,
  world,
  MinecraftEnchantmentTypes,
  MinecraftItemTypes,
} from "mojang-minecraft";
import { CONFIGURATION } from "../../config";

const MinecraftEnchantments = Object.values(MinecraftEnchantmentTypes);
const empty = new ItemStack(MinecraftItemTypes.air);
const clear = (i, inventory) => inventory.setItem(i, empty);
const getInv = (player) => player.getComponent("minecraft:inventory").container;
const gI = (i, inventory) => inventory.getItem(i) ?? empty;
const invItems = (iv) => Array.from({ length: iv.size }, (e, i) => gI(i, iv));
const enchVal = (i, n, e) => !i.canAddEnchantment(n) && n.level != e.maxLevel;

world.events.tick.subscribe(() => {
  for (const inventory of [...world.getPlayers()].map((p) => getInv(p))) {
    for (const [i, item] of invItems(inventory).entries()) {
      const itemEnchants = item.getComponent("enchantments").enchantments;
      if (CONFIGURATION.BANNED_ITEMS.includes(item.id)) clear(i, inventory);
      for (const e of MinecraftEnchantments) {
        const ench = itemEnchants.getEnchantment(e);
        if (ench && enchVal(itemEnchants, ench, e)) clear(i, inventory);
      }
    }
  }
});
