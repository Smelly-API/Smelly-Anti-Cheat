import { Database } from "./index.js";

/**
 * This stores information that is very important to Smelly API please
 * do not remove this line or change the name it could break Smelly API
 */
export let basic = new Database("default");

export let db_factions = new Database("factions");
export let db_claims = new Database("claims");
export let db_leaderboards = new Database("lbs");
export let db_bans = new Database("bans");
export let db_auctionItems = new Database("auits");
export let db_mutes = new Database("mutes");
export let db_freezes = new Database("mutes");
export let db_saves = new Database("saves")