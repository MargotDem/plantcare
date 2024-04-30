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
  createPlant: (req: any, res: any) => {
    const user_id = parseInt(req.params.user_id);
    Plant.createPlant(user_id, req.body, (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .json({ message: `Plant added with ID: ${results.rows[0].id}` });
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
	  })
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
