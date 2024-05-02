import { Router } from "express";
import { plantsController } from "../controllers";

const plantsRouter = Router();

plantsRouter.get(
  "/plantsByUserId/:user_id",
  plantsController.getPlantsByUserId
);

plantsRouter.get(
  "/scheduledPlantsByUserId/:user_id",
  plantsController.getScheduledPlantsByUserId
);

plantsRouter.post("/plants/:user_id", plantsController.createPlant);

plantsRouter.get("/plants/:id", plantsController.getPlantById);

plantsRouter.delete("/plants/:id", plantsController.deletePlant);

plantsRouter.put("/plants/:id", plantsController.updatePlant);

plantsRouter.post(
  "/assignUserToPlant/:user_id/:plant_id",
  plantsController.assignUserToPlant
);

export { plantsRouter };
