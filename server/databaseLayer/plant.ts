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

	  public createPlant(_user_id: number, plant: TPlant, callBack: any) {
		// handle assigning the plant to the user!!
		this.insert(Object.keys(plant), Object.values(plant), callBack);
	  }

	  public updatePlant(id: number, plant: TPlant, callBack: any) {
		this.update(id, Object.keys(plant), Object.values(plant), callBack);
	  }

	  public getByUserId(id: number, callBack: any) {
		this.join(id, "users", "plants_users", callBack);
	  }
}