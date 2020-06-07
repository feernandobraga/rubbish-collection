import knex from "knex";
import path from "path";

const connection = knex({
  client: "sqlite3",
  connection: {
    // path.resolve will get the current folder path and adjust it according to the OS running (/ for unix, \ for windows)
    filename: path.resolve(__dirname, "database.sqlite"), //__dirname is a global variable that gets the parent directory (/database)
  },
  useNullAsDefault: true, // this is just to get rid of a warning message when we run the migration
});

export default connection;
