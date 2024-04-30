import { useEffect, useState } from "react";
import { useAsync } from "./utils/useAsync"
import "./App.css";

const BACKEND_URL = "http://localhost:3002";

function App() {
  const fetchUsers = useAsync(async function () {
    try {
      let users = await fetch(`${BACKEND_URL}/health`);
      return users.json();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchUsers.call();
  }, []);

  return (
    <>
      {fetchUsers.isPending ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Hello</h1>
          <p>Message from the backend: {fetchUsers.value?.message}</p>
        </>
      )}
    </>
  );
}

export default App;
