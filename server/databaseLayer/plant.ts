import DatabaseLayer from "./abstractDatabaseLayer";

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

  public createPlant(plant: TPlant, callBack: any) {
    this.insert(Object.keys(plant), Object.values(plant), callBack);
  }

  public updatePlant(id: number, plant: TPlant, callBack: any) {
    this.update(id, Object.keys(plant), Object.values(plant), callBack);
  }

  public getByUserId(user_id: number, callBack: any) {
    this.join(user_id, "users", "plants_users", callBack);
  }

  public assignUserToPlant(user_id: number, plant_id: number, callBack: any) {
    this.insertJoin(
      ["user_id", "plant_id"],
      [user_id, plant_id],
      "plants_users",
      callBack
    );
  }
}
