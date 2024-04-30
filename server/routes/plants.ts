import { Router } from "express";
import { plantsController } from "../controllers";

const plantsRouter = Router();

// plantsRouter.get("/plants", plantsController.getPlants);

plantsRouter.get("/plantsByUserId/:user_id", plantsController.getPlantsByUserId);

plantsRouter.post("/plants/:user_id", plantsController.createPlant);

plantsRouter.get("/plants/:id", plantsController.getPlantById);

plantsRouter.delete("/plants/:id", plantsController.deletePlant);

plantsRouter.put("/plants/:id", plantsController.updatePlant);

export { plantsRouter };
