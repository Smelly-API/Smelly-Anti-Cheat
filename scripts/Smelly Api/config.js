export const configuration = {
  VERSION: "3.0.0",
  GAME_VERSION: "1.18.30",
  PREFIX: "-", //Default custom command prefix
  MAX_DATABASE_STRING_SIZE: 32000,
  PERMISSION_GROUPS: {
    admin: {
      inherits: ["member"],
      permissions: ["leaderboard.command.*", "worldedit.command.*"],
    },
    member: {
      inherits: [],
      permissions: [],
    },
  },
};
