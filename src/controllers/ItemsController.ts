import knex from "../database/connection";
import { Request, Response } from "express";

class ItemsController {
  async index(request: Request, response: Response) {
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
  }
}

export default ItemsController;
