import { world } from "mojang-minecraft";

/**
 * Minecraft Bedrock Gametest Database
 * @license MIT
 * @author Smell of curry
 * @version 1.0.0
 * --------------------------------------------------------------------------
 * This database stores data on players inside a objective
 * Each objective can only store 32768 string data inside its players
 * So we split up the save and save it across chunks in multiple objectives
 * --------------------------------------------------------------------------
 */

/**
 * The max string size of a objective, 32768 is max NBT
 */
const MAX_DATABASE_STRING_SIZE = 32000;

/**
 * Splits a string into chunk sizes
 * @param {string} str string to split
 * @param {number} length length of string
 * @returns {Array<string>}
 */
function chunkString(str, length) {
  return str.match(new RegExp(".{1," + length + "}", "g"));
}

/**
 * Runs a Command
 * @param {string} command a minecraft /command
 * @param {string} dimension: "overworld" | "nether" | "the end"
 * @param {boolean} debug: true console logs the command, else it runs command
 * @example runCommand(`say test`)
 */
function runCommand(command, dimension = "overworld", debug = false) {
  try {
    return debug
      ? console.warn(JSON.stringify(runCommand(command)))
      : world.getDimension(dimension).runCommand(command);
  } catch (error) {
    return { error: true };
  }
}

/**
 * Convert string to binary
 * @param {String} text you want to trasnslate to binary
 * @returns {String}
 */
function textToBinary(text) {
  return text
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(2);
    })
    .join(" ");
}
/**
 * Convert binary to string
 * @param {String} binary the binary that you want converted
 * @returns {String}
 */
function binaryToText(binary) {
  return binary
    .split(" ")
    .map((char) => {
      return String.fromCharCode(parseInt(char, 2));
    })
    .join("");
}

export class Database {
  constructor(TABLE_NAME) {
    this.TABLE_NAME = TABLE_NAME;
    this.MEMORY = [];
    this.build();
    this.fetch();
  }

  fetch() {
    try {
      for (let i = 0; i <= this.SAVE_NAMES; i++) {
        const name = `DB_${this.TABLE_NAME}_${i}`;
        const regex = new RegExp(`(?<=${name}\\()[0-1\\s]+(?=\\))`);
        const RAW_TABLE_DATA = this.SCOREBOARD_DATA.match(regex)[0];
        this.MEMORY.push({ index: i, data: `${RAW_TABLE_DATA}` });
      }
    } catch (error) {
      this.MEMORY = [{ index: 0, data: "01111011 01111101" }];
    }
  }

  build(objective = this.TABLE_NAME) {
    runCommand(`scoreboard objectives add ${objective} dummy`);
    runCommand(`scoreboard players add "DB_SAVE" ${objective} 0`);
  }

  wipe() {
    this.MEMORY = [];
    for (let i = 0; i <= this.SAVE_NAMES; i++) {
      const name = `DB_${this.TABLE_NAME}_${i}`;
      runCommand(`scoreboard objectives remove ${name}`);
    }
    runCommand(`scoreboard objectives remove ${this.TABLE_NAME}`);
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
      const data = this.MEMORY.map((a) => binaryToText(a.data));
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
      MAX_DATABASE_STRING_SIZE
    );
    this.wipe();
    for (const [index, chunk] of SPLIT_DATA.entries()) {
      const name = `DB_${this.TABLE_NAME}_${index}`;
      this.SAVE_NAMES = index;
      const data = textToBinary(chunk);
      this.MEMORY.push({
        index: index,
        data: data,
      });
      runCommand(`scoreboard objectives add ${name} dummy`);
      runCommand(`scoreboard players set "${name}(${data})" ${name} 0`);
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
    return Object.keys(this.data);
  }
  /**
   * Get all the values in the table
   * @returns {Array<any>}
   * @example Database.values();
   */
  values() {
    return Object.values(this.data);
  }
  /**
   * Gets all the keys and values
   * @returns {any}
   * @example Database.getCollection();
   */
  getCollection() {
    return this.data;
  }
}
