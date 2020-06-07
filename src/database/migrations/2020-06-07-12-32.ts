import Knex from "knex";

/* 
    each migration file needs two async functions:
    up() - commit the changes we want to make
    down() - rollback the changes
*/
export async function up(knex: Knex) {
  // createTable receives two arguments: the table name and the columns
  return knex.schema.createTable("point_items", table => {
    table.increments("id").primary(); //.primary makes the column a primary key

    // this is to create the foreign key association from the table points' and the id column
    table.integer("point_id").notNullable().references("id").inTable("points");

    // this is to create the foreign key association from the table items and the id column
    table.integer("item_id").notNullable().references("id").inTable("items");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("point_items");
}
