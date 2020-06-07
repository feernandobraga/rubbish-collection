import knex from "../database/connection";
import { Request, Response } from "express";

class PointsController {
  // this create function is called from the routes whenever the use posts to the /points url
  async create(request: Request, response: Response) {
    // this is called deconstruction. Since I know what is the format of request.body, I can get each field from the body and save
    // in a different variable. A different way of writing this would be:
    // const name = request.body.name
    // const email = request.body.email
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      state,
      items,
    } = request.body;

    // trx is a transaction that only confirms all inserts if none of them fail.
    // if any insert fail, everything will be rolled back
    const trx = await knex.transaction();

    // this variable has the values captured from request.body and is ready to be inserted in the database
    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      state,
    };

    /* 
      When the .insert is executed, it returns the id of the item that was inserted. In this case, I'm saving
      that id in the variable insertedIds, which I will use to insert in the point_items tables
    */
    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    /* 
      this will loop through the items[] that comes from the request.body and return the item_id along with the
      point ID that was captured in the ids. It returns something like this:
      {item_id: 1, point_id: 2}
      {item_id: 6, point_id: 2}
    */
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    // this insert will insert the point_id and each individual item_id associated to that point
    await trx("point_items").insert(pointItems);

    // the create method returns the ID captured when something was inserted in the "points table" along with the
    // variable point, which contains all information captured from the request.body
    return response.json({
      id: point_id,
      ...point,
    });
  } // end create()
}

export default PointsController;
