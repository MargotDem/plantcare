"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantsRouter = void 0;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var plantsRouter = (0, express_1.Router)();
exports.plantsRouter = plantsRouter;
// plantsRouter.get("/plants", plantsController.getPlants);
plantsRouter.get("/plantsByUserId/:user_id", controllers_1.plantsController.getPlantsByUserId);
plantsRouter.get("/scheduledPlantsByUserId/:user_id", controllers_1.plantsController.getScheduledPlantsByUserId);
plantsRouter.post("/plants/:user_id", controllers_1.plantsController.createPlant);
plantsRouter.get("/plants/:id", controllers_1.plantsController.getPlantById);
plantsRouter.delete("/plants/:id", controllers_1.plantsController.deletePlant);
plantsRouter.put("/plants/:id", controllers_1.plantsController.updatePlant);
plantsRouter.post("/assignUserToPlant/:user_id/:plant_id", controllers_1.plantsController.assignUserToPlant);
