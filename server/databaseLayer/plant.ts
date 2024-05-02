import DatabaseLayer from "./abstractDatabaseLayer";
import { TDatabaseCallBack } from "../controllers/databaseCallBack";

type TPlant = {
  name: string;
  description?: string;
  next_watering_due_date?: Date;
  watering_frequency: number;
};

export default class PlantDatabaseLayer extends DatabaseLayer {
  constructor(table: string) {
    super(table);
  }

  public createPlant(plant: TPlant, callBack: TDatabaseCallBack) {
    this.insert(Object.keys(plant), Object.values(plant), callBack);
  }

  public updatePlant(id: number, plant: TPlant, callBack: TDatabaseCallBack) {
    this.update(id, Object.keys(plant), Object.values(plant), callBack);
  }

  public getByUserId(user_id: number, callBack: TDatabaseCallBack) {
    const order = {};
    this.join(user_id, "users", "plants_users", callBack, order);
  }

  public getByUserIdAsc(user_id: number, callBack: TDatabaseCallBack) {
    const order = {
      asc: "true",
    };
    this.join(user_id, "users", "plants_users", callBack, order);
  }

  public assignUserToPlant(
    user_id: number,
    plant_id: number,
    callBack: TDatabaseCallBack
  ) {
    this.insertJoin(
      ["user_id", "plant_id"],
      [user_id, plant_id],
      "plants_users",
      callBack
    );
  }
}
