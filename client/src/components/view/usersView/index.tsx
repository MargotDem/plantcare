import { useEffect } from "react";
import { useAsync } from "../../../utils/useAsync";
import type { TUser } from "../../../types/usersTypes";
import styled, { css } from "styled-components";
import Loading from "../../Loading";
import UserModal from "./userModal";

const BACKEND_URL = "http://localhost:3002";

export type TCurrentUserProps = {
  currentUser: number;
  setCurrentUser: (user: number) => void;
};

const StyledUserRow = styled.p<{ $highlighted?: boolean }>`
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.$highlighted &&
    css`
      color: orange;
    `};
`;

const UserRow = ({
  isCurrentUser,
  user,
  setCurrentUser,
}: {
  isCurrentUser: boolean;
  user: TUser;
  setCurrentUser: (id: number) => void;
}) => {
  return (
    <li>
      <StyledUserRow
        $highlighted={isCurrentUser}
        onClick={() => setCurrentUser(user.id)}
      >
        {`${user.name}${isCurrentUser ? ` (current user)` : ""}`}
        <input type="checkbox" checked={isCurrentUser}></input>
        (set current user)
      </StyledUserRow>
      <>
        <UserModal user_id={user.id} isCurrentUser={isCurrentUser} />
      </>
    </li>
  );
};

const UsersView = ({ currentUser, setCurrentUser }: TCurrentUserProps) => {
  const fetchUsers = useAsync(async function () {
    try {
      const users = await fetch(`${BACKEND_URL}/users`);
      return users.json();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchUsers.call();
  }, []);

  // console.log("users");
  // console.log(fetchUsers.value);
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
              const isCurrentUser = currentUser === user.id;
              return (
                <UserRow
                  key={id}
                  user={user}
                  isCurrentUser={isCurrentUser}
                  setCurrentUser={setCurrentUser}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default UsersView;