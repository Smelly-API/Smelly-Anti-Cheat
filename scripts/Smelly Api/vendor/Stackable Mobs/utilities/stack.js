import { Entity } from "mojang-minecraft";
import { SA } from "../../../index.js";
/**
 * Sets the stack of a entity
 * @param {Entity} entity your using
 * @param {number} value what stack ammount you want it to have
 * @example setStack(Entity, 2)
 */
export function setStack(entity, value) {
  const current_stack = getStack(entity);
  entity.removeTag(`stack:${current_stack.toString()}`);
  entity.addTag(`stack:${value.toString()}`);
  entity.addTag(`is_stacked`);
  const name = SA.Utilities.format.capitalizeFirstLetter(
    SA.Models.entity.getGenericName(entity.id)
  );
  entity.nameTag = `§b${value}x §6${name} `;
}
/**
 * Returns the current stack of the entity
 * @param {Entity} entity your using
 * @param {number} value what stack ammount you want it to have
 * @returns {number} number of stack
 * @example getStack(Entity)
 */
export function getStack(entity) {
  const value = SA.Models.entity.getTagStartsWith(entity, "stack:") ?? "1";
  return parseInt(value);
}