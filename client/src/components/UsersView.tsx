import { useEffect } from "react";
import { useAsync } from "../utils/useAsync";
import type {TUser} from "../types/usersTypes"

export const BACKEND_URL = "http://localhost:3002";

const Loading = () => {
  return <div>...loading...</div>;
};

const UsersView = () => {
  const fetchUsers = useAsync(async function () {
    try {
      let users = await fetch(`${BACKEND_URL}/users`);
      return users.json();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchUsers.call();
  }, []);

  console.log("users");
  console.log(fetchUsers.value);
  const users = fetchUsers.value;
  return (
    <div>
      {fetchUsers.isPending ? (
        <Loading />
      ) : (
        <>
          <h4>Users</h4>
          <ul>
            {(users as unknown as TUser[])?.map((user, id) => {
              return <li key={id}>{user.name}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default UsersView;
