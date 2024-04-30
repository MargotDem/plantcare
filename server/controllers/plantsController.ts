import PlantDatabaseLayer from "../databaseLayer/plant";

const Plant = new PlantDatabaseLayer("plants");

const plantsController = {
  getPlantsByUserId: (req: any, res: any) => {
    const id = parseInt(req.params.user_id);
    Plant.getByUserId(id, (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  },
  createPlant: async (req: any, res: any) => {
    // create the plant
    let newPlantId: number;
    await new Promise<void>(function (resolve, _reject) {
      Plant.createPlant(req.body, (error: any, results: any) => {
        if (error) {
          throw error;
        }
        newPlantId = results.rows[0].id;
        resolve();
      });
    });

    // assign the plant to the user who created it, if doesnt work: delete the plant
    const user_id = parseInt(req.params.user_id);
    // Plant.assignPlantToUser(user_id)
    await new Promise<void>(function (resolve, _reject) {
      Plant.assignUserToPlant(
        user_id,
        newPlantId,
        (error: any, _results: any) => {
          if (error) {
            throw error;
            // TODO: if didn't work: delete the plant
          }
          resolve();
        }
      );
    });

    // send response
    res.status(201).json({ message: `Plant added with ID: ${0}` });
  },
  assignUserToPlant: (req: any, res: any) => {
    const user_id = parseInt(req.params.user_id);
    const plant_id = parseInt(req.params.plant_id);
    Plant.assignUserToPlant(user_id, plant_id, (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  },
  getPlantById: (req: any, res: any) => {
    // handle also returning all the users associated to the plant
    const id = parseInt(req.params.id);
    Plant.getById(id, (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  },
  deletePlant: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    Plant.delete(id, (error: any, _results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json({ message: `Plant deleted with ID: ${id}` });
    });
  },
  updatePlant: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    Plant.updatePlant(id, req.body, (error: any, _results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json({ message: `Plant updated with ID: ${id}` });
    });
  },
};

export default plantsController;
