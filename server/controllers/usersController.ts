import UserDatabaseLayer from "../databaseLayer/user";
import databaseCallBack from "./databaseCallBack";

const User = new UserDatabaseLayer("users");

const usersController = {
  getUsers: (_req: any, res: any) => {
    const callBack = databaseCallBack(
      (results: any) => res.status(200).json(results.rows),
      (_error: any) => res.status(500).json({ message: "Database error" })
    );
    User.getAll(callBack);
  },

  createUser: (req: any, res: any) => {
    const callBack = databaseCallBack(
      (results: any) =>
        res
          .status(200)
          .json({ message: `User added with ID: ${results.rows[0].id}` }),
      (_error: any) => res.status(500).json({ message: "Database error" })
    );
    User.createUser(req.body, callBack);
  },

  getUserById: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const callBack = databaseCallBack(
      (results: any) => res.status(200).json(results.rows),
      (_error: any) => res.status(500).json({ message: "Database error" })
    );
    User.getById(id, callBack);
  },

  deleteUser: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const callBack = databaseCallBack(
      (_results: any) =>
        res.status(200).json({ message: `User deleted with ID: ${id}` }),
      (_error: any) => res.status(500).json({ message: "Database error" })
    );
    User.delete(id, callBack);
  },

  updateUser: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const callBack = databaseCallBack(
      (_results: any) =>
        res.status(200).json({ message: `User updater with ID: ${id}` }),
      (_error: any) => res.status(500).json({ message: "Database error" })
    );
    User.updateUser(id, req.body, callBack);
  },
};

export default usersController;
