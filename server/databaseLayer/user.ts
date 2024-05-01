import DatabaseLayer from "./abstractDatabaseLayer";

type TUser = {
  name: string;
};

export default class UserDatabaseLayer extends DatabaseLayer {
  constructor(table: string) {
    super(table);
  }

  public createUser(user: TUser, callBack: any) {
    this.insert(Object.keys(user), Object.values(user), callBack);
  }

  public updateUser(id: number, user: TUser, callBack: any) {
    this.update(id, Object.keys(user), Object.values(user), callBack);
  }

  public getByPlantId(id: number, callBack: any) {
    this.join(id, "plants", "plants_users", callBack);
  }
}
