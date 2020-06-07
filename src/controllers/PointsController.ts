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

    // before sending the results back, we need to commit the transaction
    await trx.commit();

    // the create method returns the ID captured when something was inserted in the "points table" along with the
    // variable point, which contains all information captured from the request.body
    return response.json({
      id: point_id,
      ...point,
    });
  } // end create()

  async show(request: Request, response: Response) {
    const { id } = request.params; // the equivalent of: const id = request.params.id;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found" });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");
    /* 
          SELECT items.title
          FROM items INNER JOIN point_items ON items.id = point_items.item_id
          AND point_items.point_id = {id}
      */

    return response.json({ point, items });
  } // end show()

  async index(request: Request, response: Response) {
    const { city, state, items } = request.query;
    /*  SAME AS
        const city = request.query.city
        const state = request.query.state
        const items = request.query.state
    */

    // gets all items form the request.query, remove the coma, trim the space and save into the parsedItems[]
    const parsedItems = String(items)
      .split(",")
      .map(item => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("state", String(state))
      .distinct()
      .select("points.*");
    /* 
          SELECT distinct points.*
          FROM points INNER JOIN point_items ON points.id == points_items.point_id
          AND point_items.item_id IN [ {parsedItems} ]
          AND city == {city}
          AND state == {state}
      */

    return response.json(points);
  } // end index()
}

export default PointsController;
