import express, { request, response } from "express";
import knex from "./database/connection";
import PointsController from "./controllers/PointsController";

const routes = express.Router();
const pointsController = new PointsController();

/* 
    GET localhost:3333/items
    Since this is a database query that can take a while to return, we need to use await and async
*/
routes.get("/items", async (request, response) => {
  const items = await knex("items").select("*"); // SELECT * from ITEMS

  // serializedItems will get every item from the array and return it with the changes that I want.
  // in this case, I'm adding the complete path to the image
  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return response.json(serializedItems);
});

/* 
    POST localhost:3333/points
    This route will create points of collection in the database. It calls for the create function in the Points Controller
*/
routes.post("/points", pointsController.create);

export default routes;
