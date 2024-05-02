import PlantDatabaseLayer from "../databaseLayer/plant";
import UserDatabaseLayer from "../databaseLayer/user";
import databaseCallBack from "./databaseCallBack";
import { Request, Response } from "express";
import { QueryResult } from "pg";

const Plant = new PlantDatabaseLayer("plants");
const User = new UserDatabaseLayer("users");

const plantsController = {
  getScheduledPlantsByUserId: (req: Request, res: Response) => {
    const id = parseInt(req.params.user_id);
    const callBack = databaseCallBack(
      (results: QueryResult) => res.status(200).json(results.rows),
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    Plant.getByUserIdAsc(id, callBack);
  },

  getPlantsByUserId: (req: Request, res: Response) => {
    const id = parseInt(req.params.user_id);
    const callBack = databaseCallBack(
      (results: QueryResult) => res.status(200).json(results.rows),
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    Plant.getByUserId(id, callBack);
  },

  createPlant: async (req: Request, res: Response) => {
    // create the plant
    let newPlantId = 0;
    await new Promise<void>(function (resolve, _reject) {
      const callBack = databaseCallBack(
        (results: QueryResult) => {
          newPlantId = results.rows[0].id;
          resolve();
        },
        (_error: Error) => res.status(500).json({ message: "Database error" })
      );
      Plant.createPlant(req.body, callBack);
    });

    // assign the plant to the user who created it, if doesnt work: delete the plant
    const user_id = parseInt(req.params.user_id);
    await new Promise<void>(function (resolve, _reject) {
      const callBack = databaseCallBack(
        (_results: QueryResult) => {
          resolve();
        },
        (_error: Error) => res.status(500).json({ message: "Database error" })
      );
      Plant.assignUserToPlant(user_id, newPlantId, callBack);
    });

    res.status(201).json({ message: `Plant added with ID: ${newPlantId}` });
  },

  assignUserToPlant: (req: Request, res: Response) => {
    const user_id = parseInt(req.params.user_id);
    const plant_id = parseInt(req.params.plant_id);
    const callBack = databaseCallBack(
      (results: QueryResult) => res.status(200).json(results.rows),
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    Plant.assignUserToPlant(user_id, plant_id, callBack);
  },

  getPlantById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const plantInfo: { plant: any; users: any[] } = {
      plant: null,
      users: [],
    };

    await new Promise<void>(function (resolve, _reject) {
      const callBack = databaseCallBack(
        (results: QueryResult) => {
          plantInfo.plant = results.rows[0];
          resolve();
        },
        (_error: Error) => res.status(500).json({ message: "Database error" })
      );
      Plant.getById(id, callBack);
    });

    await new Promise<void>(function (resolve, _reject) {
      const callBack = databaseCallBack(
        (results: QueryResult) => {
          plantInfo.users = results.rows;
          resolve();
        },
        (_error: Error) => res.status(500).json({ message: "Database error" })
      );
      User.getByPlantId(id, callBack);
    });

    res.status(200).json(plantInfo);
  },

  deletePlant: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const callBack = databaseCallBack(
      (_results: QueryResult) => {
        res.status(200).json({ message: `Plant deleted with ID: ${id}` });
      },
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    Plant.delete(id, callBack);
  },

  updatePlant: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const callBack = databaseCallBack(
      (_results: QueryResult) => {
        res.status(200).json({ message: `Plant updated with ID: ${id}` });
      },
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    Plant.updatePlant(id, req.body, callBack);
  },
};

export default plantsController;
