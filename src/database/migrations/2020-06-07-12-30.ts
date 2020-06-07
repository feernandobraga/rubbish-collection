import Knex from "knex";

/* 
    each migration file needs two async functions:
    up() - commit the changes we want to make
    down() - rollback the changes
*/
export async function up(knex: Knex) {
  // createTable receives two arguments: the table name and the columns
  return knex.schema.createTable("points", table => {
    table.increments("id").primary(); //.primary makes the column a primary key
    table.string("image").notNullable;
    table.string("name").notNullable;
    table.string("email").notNullable;
    table.string("whatsapp").notNullable;
    table.decimal("latitude").notNullable;
    table.decimal("longitude").notNullable;
    table.string("city").notNullable;
    table.string("state", 3).notNullable; //3 is the length of the field
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("points");
}
