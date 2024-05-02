import { QueryResult } from "pg";

export type TDatabaseCallBack = (err: Error, result: QueryResult<any>) => void;

const databaseCallBack = (
  onSucces: (results: QueryResult) => void,
  onError: (error: Error) => void
) => {
  return (error: Error, results: QueryResult<any>) => {
    try {
      if (error) {
        throw error;
      }
      onSucces(results);
    } catch (e) {
      console.log("Database error:");
      console.log(e);
      onError(error);
    }
  };
};

export default databaseCallBack;
