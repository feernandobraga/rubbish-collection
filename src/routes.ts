import express from "express";

const routes = express.Router();

/* 
    localhost:3333/
*/
routes.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

export default routes;
