import Knex from "knex";

/* 
    each migration file needs two async functions:
    up() - commit the changes we want to make
    down() - rollback the changes
*/
export async function up(knex: Knex) {
  // createTable receives two arguments: the table name and the columns
  return knex.schema.createTable("items", table => {
    table.increments("id").primary(); //.primary makes the column a primary key
    table.string("image").notNullable();
    table.string("title").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("items");
}
