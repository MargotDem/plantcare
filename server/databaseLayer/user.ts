import DatabaseLayer from "./abstractDatabaseLayer";
import { TDatabaseCallBack } from "../controllers/databaseCallBack";

type TUser = {
  name: string;
};

export default class UserDatabaseLayer extends DatabaseLayer {
  constructor(table: string) {
    super(table);
  }

  public createUser(user: TUser, callBack: TDatabaseCallBack) {
    this.insert(Object.keys(user), Object.values(user), callBack);
  }

  public updateUser(id: number, user: TUser, callBack: TDatabaseCallBack) {
    this.update(id, Object.keys(user), Object.values(user), callBack);
  }

  public getByPlantId(id: number, callBack: TDatabaseCallBack) {
    const order = {};
    this.join(id, "plants", "plants_users", callBack, order);
  }
}
