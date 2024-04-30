import { Router } from "express";
import { usersController } from "../controllers";

const usersRouter = Router();

usersRouter.get("/users", usersController.getUsers);

usersRouter.post("/users", usersController.createUser);

usersRouter.get("/users/:id", usersController.getUserById);

usersRouter.delete("/users/:id", usersController.deleteUser);

usersRouter.put("/users/:id", usersController.updateUser);

export { usersRouter };
