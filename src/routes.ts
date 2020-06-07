import express, { request, response } from "express";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();
/* 
    GET localhost:3333/items
    this will call the index function from the itemsController
*/
routes.get("/items", itemsController.index);

/* 
    GET localhost:3333/points?city=Melbourne&state=VIC&items=1,2
*/
routes.get("/points/", pointsController.index);

/* 
    GET localhost:3333/points/1
*/
routes.get("/points/:id", pointsController.show);

/* 
    POST localhost:3333/points
    This route will create points of collection in the database. It calls for the create function in the Points Controller
*/
routes.post("/points", pointsController.create);

export default routes;
