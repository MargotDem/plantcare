import { useEffect, useState } from "react";
import { useAsync } from "../../../utils/useAsync";
import type { TUser } from "../../../types/usersTypes";
import styled, { css } from "styled-components";
import Loading from "../../Loading";
import UserInfoModal from "./UserInfoModal";
import CreateUserModal from "./CreateUserModal";
import Button from "../../Button";

const BACKEND_URL = "http://localhost:3002";

export type TCurrentUserProps = {
  currentUser: number;
  setCurrentUser: (user: number) => void;
};

const StyledUserRow = styled.p<{ $highlighted?: boolean }>`
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
  refreshUsers: any;
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
          setCurrentUser={setCurrentUser}
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
      const users = await fetch(`${BACKEND_URL}/users`);
      return users.json();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    console.log("in use effect");
    console.log("current user");
    console.log(currentUser);
    fetchUsers.call();
  }, []);

  const refreshUsers = () => {
    fetchUsers.call();
  };

  useEffect(() => {
    console.log("does this fire several times??");
    console.log(fetchUsers.value);
    setUsers(fetchUsers.value);
    // fetchUsers.value && setCurrentUser(fetchUsers.value[0]?.id);
    if (currentUser === 0) {
      //fetchUsers.value.map((user, id) => return user.id)
      // fetchUsers.value && setCurrentUser(fetchUsers.value[0]?.id);
    }
    if (
      fetchUsers.value &&
      !fetchUsers.value.map((user: TUSer) => user.id).includes(currentUser)
    ) {
      console.log("were here");
      fetchUsers.value && setCurrentUser(fetchUsers.value[0]?.id);
    }
  }, [fetchUsers.value]);

  // console.log("users");
  // console.log(fetchUsers.value);
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
            console.log();
            // if (user.id === 0) {
            //   console.log
            // }
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
