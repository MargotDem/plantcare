const databaseCallBack = (
  onSucces: (results: any) => void,
  onError: (error: any) => void
) => {
  return (error: any, results: any) => {
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
