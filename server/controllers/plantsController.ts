import PlantDatabaseLayer from "../databaseLayer/plant";
import UserDatabaseLayer from "../databaseLayer/user";
import databaseCallBack from "./databaseCallBack";

const Plant = new PlantDatabaseLayer("plants");
const User = new UserDatabaseLayer("users");

const plantsController = {
  getPlantsByUserId: (req: any, res: any) => {
    const id = parseInt(req.params.user_id);
    const callBack = databaseCallBack(
      (results: any) => res.status(200).json(results.rows),
      (_error: any) => res.status(500).json({ message: "Database error" })
    );
    Plant.getByUserId(id, callBack);
  },

  createPlant: async (req: any, res: any) => {
    // create the plant
    let newPlantId = 0;
    await new Promise<void>(function (resolve, _reject) {
      const callBack = databaseCallBack(
        (results: any) => {
          newPlantId = results.rows[0].id;
          resolve();
        },
        (_error: any) => res.status(500).json({ message: "Database error" })
      );
      Plant.createPlant(req.body, callBack);
    });

    // assign the plant to the user who created it, if doesnt work: delete the plant
    const user_id = parseInt(req.params.user_id);
    await new Promise<void>(function (resolve, _reject) {
      const callBack = databaseCallBack(
        (_results: any) => {
          resolve();
        },
        (_error: any) => res.status(500).json({ message: "Database error" })
      );
      Plant.assignUserToPlant(user_id, newPlantId, callBack);
    });

    // send response
    res.status(201).json({ message: `Plant added with ID: ${newPlantId}` });
  },

  assignUserToPlant: (req: any, res: any) => {
    const user_id = parseInt(req.params.user_id);
    const plant_id = parseInt(req.params.plant_id);
    const callBack = databaseCallBack(
      (results: any) => res.status(200).json(results.rows),
      (_error: any) => res.status(500).json({ message: "Database error" })
    );
    Plant.assignUserToPlant(user_id, plant_id, callBack);
  },

  getPlantById: async (req: any, res: any) => {
    // handle also returning all the users associated to the plant
    const id = parseInt(req.params.id);
    const plantInfo = {
      plant: null,
      users: null,
    };

    await new Promise<void>(function (resolve, _reject) {
      const callBack = databaseCallBack(
        (results: any) => {
          plantInfo.plant = results.rows[0];
          resolve();
        },
        (_error: any) => res.status(500).json({ message: "Database error" })
      );
      Plant.getById(id, callBack);
    });

    await new Promise<void>(function (resolve, _reject) {
      const callBack = databaseCallBack(
        (results: any) => {
          plantInfo.users = results.rows;
          resolve();
        },
        (_error: any) => res.status(500).json({ message: "Database error" })
      );
      User.getByPlantId(id, callBack);
    });

    res.status(200).json(plantInfo);
  },

  deletePlant: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const callBack = databaseCallBack(
      (_results: any) => {
        res.status(200).json({ message: `Plant deleted with ID: ${id}` });
      },
      (_error: any) => res.status(500).json({ message: "Database error" })
    );
    Plant.delete(id, callBack);
  },

  updatePlant: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const callBack = databaseCallBack(
      (_results: any) => {
        res.status(200).json({ message: `Plant updated with ID: ${id}` });
      },
      (_error: any) => res.status(500).json({ message: "Database error" })
    );
    Plant.updatePlant(id, req.body, callBack);
  },
};

export default plantsController;
