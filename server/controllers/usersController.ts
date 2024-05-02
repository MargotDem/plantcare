import UserDatabaseLayer from "../databaseLayer/user";
import databaseCallBack from "./databaseCallBack";
import { Request, Response } from "express";
import { QueryResult } from "pg";

const User = new UserDatabaseLayer("users");

const usersController = {
  getUsers: (_req: Request, res: Response) => {
    const callBack = databaseCallBack(
      (results: QueryResult) => res.status(200).json(results.rows),
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    User.getAll(callBack);
  },

  createUser: (req: Request, res: Response) => {
    const callBack = databaseCallBack(
      (results: QueryResult) => {
        const newUserId = results.rows[0].id;
        res
          .status(200)
          .json({ message: `User added with ID: ${newUserId}`, newUserId });
      },
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    User.createUser(req.body, callBack);
  },

  getUserById: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const callBack = databaseCallBack(
      (results: QueryResult) => res.status(200).json(results.rows),
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    User.getById(id, callBack);
  },

  deleteUser: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const callBack = databaseCallBack(
      (_results: QueryResult) =>
        res.status(200).json({ message: `User deleted with ID: ${id}` }),
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    User.delete(id, callBack);
  },

  updateUser: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const callBack = databaseCallBack(
      (_results: QueryResult) =>
        res.status(200).json({ message: `User updater with ID: ${id}` }),
      (_error: Error) => res.status(500).json({ message: "Database error" })
    );
    User.updateUser(id, req.body, callBack);
  },
};

export default usersController;
