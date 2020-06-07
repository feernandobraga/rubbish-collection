/* 
    This file is important so knex knows where to find the migrations
    To run the migration: npx knex migrate:latest --knexfile knexfile.ts migrate:latest
*/
import path from "path";
module.exports = {
  client: "sqlite3",
  connection: {
    // path.resolve will get the current folder path and adjust it according to the OS running (/ for unix, \ for windows)
    filename: path.resolve(__dirname, "src", "database", "database.sqlite"), //__dirname is a global variable that gets the parent directory (src/database)
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"), // this points to the migrations folder
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds"),
  },
  useNullAsDefault: true, // this is just to get rid of a warning message when we run the migration
};
