import { world } from "mojang-minecraft";
import * as SA from "../../../index.js";

// Data is saved on scoreboards each table has a indevidual objective
// each objective has a list of players and those players have data stored in there name
// it is stored in Binary and cuts off and continues on another player if it becomes to long

/**
 * Splits a string into chunk sizes
 * @param {string} str string to split
 * @param {number} length length of string
 * @returns {Array<string>}
 */
function chunkString(str, length) {
  return str.match(new RegExp(".{1," + length + "}", "g"));
}

export class Database {
  constructor(TABLE_NAME) {
    this.TABLE_NAME = TABLE_NAME;
    this.MEMORY = [];
    this.build();
    this.fetch();
  }

  fetch() {
    const SCOREBOARD_DATA = this.SCOREBOARD_DATA;
    try {
      for (let i = 0; i <= this.SAVE_NAMES; i++) {
        const name = `DB_${this.TABLE_NAME}_${i}`;
        const regex = new RegExp(`(?<=${name}\\()[0-1\\s]+(?=\\))`);
        const RAW_TABLE_DATA = SCOREBOARD_DATA.match(regex)[0];
        this.MEMORY.push({ index: i, data: `${RAW_TABLE_DATA}` });
      }
    } catch (error) {
      this.MEMORY = [{ index: 0, data: "01111011 01111101" }];
    }
  }

  build(objective = this.TABLE_NAME) {
    SA.build.chat.runCommand(`scoreboard objectives add ${objective} dummy`);
    SA.build.chat.runCommand(`scoreboard players add "DB_SAVE" ${objective} 0`);
  }

  wipe() {
    this.MEMORY = [];
    SA.build.chat.runCommand(`scoreboard objectives remove ${this.TABLE_NAME}`);
    this.build();
  }

  get SCOREBOARD_DATA() {
    return world.getDimension("overworld").runCommand(`scoreboard players list`)
      .statusMessage;
  }

  get SAVE_NAMES() {
    try {
      const command = world
        .getDimension("overworld")
        .runCommand(
          `scoreboard players test "DB_SAVE" "${this.TABLE_NAME}" * *`
        );
      return parseInt(command.statusMessage.split(" ")[1]);
    } catch (error) {
      return 0;
    }
  }

  set SAVE_NAMES(value) {
    world
      .getDimension("overworld")
      .runCommand(
        `scoreboard players set "DB_SAVE" "${this.TABLE_NAME}" ${value}`
      );
  }
  /**
   * Gets the database from the world
   * @returns {JSON}
   */
  get data() {
    try {
      const data = this.MEMORY.map((a) =>
        SA.untils.formatter.binaryToText(a.data)
      );
      return JSON.parse(data.join(""));
    } catch (error) {
      return {};
    }
  }

  /**
   * Saves local memory data to database
   * @param {JSON} json value to save to DB
   */
  save(json) {
    const SPLIT_DATA = chunkString(
      JSON.stringify(json),
      SA.config.MAX_DATABASE_STRING_SIZE
    );
    this.wipe();
    for (const [index, chunk] of SPLIT_DATA.entries()) {
      const name = `DB_${this.TABLE_NAME}_${index}`;
      this.SAVE_NAMES = index;
      this.MEMORY.push({
        index: index,
        data: SA.untils.formatter.textToBinary(chunk),
      });
      SA.build.chat.runCommand(
        `scoreboard players set "${name}(${SA.untils.formatter.textToBinary(
          chunk
        )})" ${this.TABLE_NAME} 0`
      );
    }
  }

  get(key) {
    const data = this.data;
    return data[key];
  }

  set(key, value) {
    let data = this.data;
    data[key] = value;
    this.save(data);
  }
  /**
   * Check if the key exists in the table
   * @param {string} key
   * @returns {boolean}
   * @example Database.has('Test Key');
   */
  has(key) {
    return this.keys().includes(key);
  }
  /**
   * Delete the key from the table
   * @param {string} key
   * @returns {boolean}
   * @example Database.delete('Test Key');
   */
  delete(key) {
    let json = this.data;
    const status = delete json[key];
    this.save(json);
    return status;
  }
  /**
   * Returns the number of key/value pairs in the Map object.
   * @example Database.size()
   */
  size() {
    return this.keys().length;
  }
  /**
   * Clear everything in the table
   * @example Database.clear()
   */
  clear() {
    this.save({});
  }
  /**
   * Get all the keys in the table
   * @returns {Array<string>}
   * @example Database.keys();
   */
  keys() {
    let json = this.data;
    return Object.keys(json);
  }
  /**
   * Get all the values in the table
   * @returns {Array<any>}
   * @example Database.values();
   */
  values() {
    let json = this.data;
    return Object.values(json);
  }
  /**
   * Gets all the keys and values
   * @returns {any}
   * @example Database.getCollection();
   */
  getCollection() {
    let json = this.data;
    return json;
  }
}
