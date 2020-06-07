/* 
    This file is responsible for pre-populating the database
*/

import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("items").insert([
    { title: "Lamps", image: "lampadas.svg" },
    { title: "Batteries", image: "baterias.svg" },
    { title: "Papers & Cardboard", image: "papeis-papelao.svg" },
    { title: "Electronics", image: "eletronicos.svg" },
    { title: "Organic Residues", image: "organicos.svg" },
    { title: "Cooking Oil", image: "oleo.svg" },
  ]);
}
