import { pool } from "../config";
import { TDatabaseCallBack } from "../controllers/databaseCallBack";

export default class DatabaseLayer {
  protected table: string;

  constructor(table: string) {
    this.table = table;
  }

  public getAll(callBack: TDatabaseCallBack) {
    pool.query(`SELECT * FROM ${this.table} ORDER BY id ASC`, callBack);
  }

  public async getById(id: number, callBack: TDatabaseCallBack) {
    pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id], callBack);
  }

  public delete(id: number, callBack: TDatabaseCallBack) {
    pool.query(`DELETE FROM ${this.table} WHERE id = $1`, [id], callBack);
  }

  protected insert(
    columns: string[],
    values: (string | Date | number)[],
    callBack: TDatabaseCallBack
  ) {
    pool.query(
      `INSERT INTO ${this.table} (${columns.toString()}) VALUES (${[
        ...values.map((_val, id) => `$${id + 1}`),
      ].toString()})  RETURNING *;`,
      values,
      callBack
    );
  }

  protected update(
    id: number,
    columns: string[],
    values: (string | Date | number)[],
    callBack: TDatabaseCallBack
  ) {
    const columnsValuesPairs = [
      ...columns.map((col, id) => `${col} = $${id + 1}`),
    ].toString();
    pool.query(
      `UPDATE ${this.table} SET ${columnsValuesPairs} WHERE id = $${
        columns.length + 1
      }`,
      [...values, id],
      callBack
    );
  }

  protected join(
    id: number,
    joinedTable: string,
    jointTable: string,
    callBack: TDatabaseCallBack,
    order: { asc?: string }
  ) {
    /*
		TODO: this join method is entirely reliant on the fact that tables and joint tables are named
		like this:
		plants, users, plants_users
		and that the fields in the joint table are named like: plant_id, user_id

		not great
	*/
    pool.query(
      `SELECT *
	FROM ${joinedTable}
	JOIN ${jointTable} ON ${joinedTable}.id = ${jointTable}.${joinedTable.slice(
        0,
        -1
      )}_id
	JOIN ${this.table} ON ${this.table}.id = ${jointTable}.${this.table.slice(
        0,
        -1
      )}_id
	WHERE ${joinedTable}.id = ${id} ${
        order.asc ? "ORDER BY next_watering_due_date ASC" : ""
      };`,
      callBack
    );
  }

  protected insertJoin(
    columns: string[],
    values: (string | Date | number)[],
    jointTable: string,
    callBack: TDatabaseCallBack
  ) {
    pool.query(
      `INSERT INTO ${jointTable} (${columns.toString()}) VALUES (${[
        ...values.map((_val, id) => `$${id + 1}`),
      ].toString()})  RETURNING *;`,
      values,
      callBack
    );
  }
}
