import { world, EntityQueryOptions, Location, Entity } from "mojang-minecraft";
import { STACKABLE_MOBS } from "./config.js";
import { getStack, setStack } from "./utilities/stack.js";

/**
 * Minecraft Bedrock Mob Stacker
 * @license MIT
 * @author Smell of curry
 * @version 2.0.0
 * --------------------------------------------------------------------------
 * This is a mob stacker that works by getting all entitys in the game
 * then it gets the closest mob to each entity and kills it and adds that
 * entity to the orginal entitys current stack, and on death respawns -1 stack
 * --------------------------------------------------------------------------
 */

/**
 * Returns the closets entity
 * @param {Entity} entity your using
 * @param {number} maxDistance max distance away
 * @param {String} type type of entity you want to get
 * @returns {Entity | null}
 * @example getClosetEntity(Entity, 10, Entity.id, 1)
 */
function getClosetEntity(entity, maxDistance = null, type = false) {
  let q = new EntityQueryOptions();
  q.location = entity.location;
  q.closest = 2;
  if (type) q.type = type;
  if (maxDistance) q.maxDistance = maxDistance;
  let entitys = [...entity.dimension.getEntities(q)];
  entitys.shift();
  return entitys?.[0];
}

world.events.tick.subscribe(() => {
  for (const entity of world.getDimension("overworld").getEntities()) {
    if (!entity || !STACKABLE_MOBS.includes(entity.id)) continue;
    let ce = getClosetEntity(entity, 10, entity.id);
    if (!ce) continue;
    setStack(entity, getStack(entity) + getStack(ce));
    ce.teleport(new Location(0, -64, 0), ce.dimension, 0, 0);
    ce.kill();
  }
});

// THIS IS entityHit Right now but it should be entityHurt, once the
// next beta is release then i will change this but there is a bug
// that caused the entityHurt event to not send back data on death

world.events.entityHit.subscribe(({ hitEntity }) => {
  if (!hitEntity || !hitEntity.hasTag("is_stacked")) return;
  if (hitEntity.getComponent("minecraft:health").current ?? 0 > 0) return;
  const stack = getStack(hitEntity);
  if (stack <= 1) return;
  const newEntity = hitEntity.dimension.spawnEntity(
    hitEntity.id,
    hitEntity.location
  );
  setStack(newEntity, stack - 1);
});
