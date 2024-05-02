import { useEffect, useState } from "react";
import { useAsync } from "../../../utils/useAsync";
import type { TUser } from "../../../types/usersTypes";
import styled, { css } from "styled-components";
import Loading from "../../Loading";
import UserInfoModal from "./UserInfoModal";
import CreateUserModal from "./CreateUserModal";
import Button from "../../Button";

export type TCurrentUserProps = {
  currentUser: number;
  setCurrentUser: (user: number) => void;
};

const StyledUserRow = styled.div<{ $highlighted?: boolean }>`
  border-radius: 8px;
  padding: 5px;
  margin-top: 8px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  background-color: #424242;
  ${(props) =>
    props.$highlighted &&
    css`
      background-color: #228b22;
    `};
`;

const ChoosUserButton = styled(Button)`
  font-size: small;
`;

const SideButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserRow = ({
  isCurrentUser,
  user,
  setCurrentUser,
  refreshUsers,
}: {
  isCurrentUser: boolean;
  user: TUser;
  setCurrentUser: (id: number) => void;
  refreshUsers: () => void;
}) => {
  return (
    <StyledUserRow $highlighted={isCurrentUser}>
      <p>
        {`${user.name}`}
        <br />
        {`${isCurrentUser ? `(current user)` : ""}`}
      </p>
      <SideButtonsDiv>
        {" "}
        <UserInfoModal
          user_id={user.id}
          isCurrentUser={isCurrentUser}
          refreshUsers={refreshUsers}
        />
        <ChoosUserButton onClick={() => setCurrentUser(user.id)}>
          Set as current user
        </ChoosUserButton>
      </SideButtonsDiv>
    </StyledUserRow>
  );
};

const UsersView = ({ currentUser, setCurrentUser }: TCurrentUserProps) => {
  const [users, setUsers] = useState<TUser[]>([]);

  const fetchUsers = useAsync(async function () {
    try {
      const users = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`);
      return users.json();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchUsers.call();
  }, []);

  const refreshUsers = () => {
    fetchUsers.call();
  };

  useEffect(() => {
    setUsers(fetchUsers.value);
    if (
      fetchUsers.value &&
      !fetchUsers.value.map((user: TUser) => user.id).includes(currentUser)
    ) {
      fetchUsers.value && setCurrentUser(fetchUsers.value[0]?.id);
    }
  }, [fetchUsers.value]);

  return (
    <div>
      {fetchUsers.isPending ? (
        <Loading />
      ) : (
        <>
          <CreateUserModal
            refreshUsers={refreshUsers}
            setCurrentUser={setCurrentUser}
          />
          <br />
          <br />

          {(users as unknown as TUser[])?.map((user, id) => {
            const isCurrentUser = currentUser === user.id;
            return (
              <UserRow
                key={id}
                user={user}
                isCurrentUser={isCurrentUser}
                setCurrentUser={setCurrentUser}
                refreshUsers={refreshUsers}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default UsersView;
