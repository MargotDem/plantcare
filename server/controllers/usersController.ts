import UserDatabaseLayer from "../databaseLayer/user";
// import PlantDatabaseLayer from "../databaseLayer/plant";

const User = new UserDatabaseLayer("users");
// const Plant = new PlantDatabaseLayer("plants");

const usersController = {
  getUsers: (_req: any, res: any) => {
    User.getAll((error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  },
  createUser: (req: any, res: any) => {
    User.createUser(req.body, (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .json({ message: `User added with ID: ${results.rows[0].id}` });
    });
  },
  getUserById: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    User.getById(id, (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  },
  deleteUser: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    User.delete(id, (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json({ message: `User deleted with ID: ${id}` });
    });
  },
  updateUser: (req: any, res: any) => {
    const id = parseInt(req.params.id);
    User.updateUser(id, req.body, (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json({ message: `User updater with ID: ${id}` });
    });
  },
//   getUsersByPlantId: (req: any, res: any) => {
//     const id = parseInt(req.params.id);
//     User.getByPlantId(id, (error: any, results: any) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(results.rows);
//     });
//   },
};

export default usersController;
