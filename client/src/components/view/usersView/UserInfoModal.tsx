import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import type { TUser } from "../../../types/usersTypes";
import Button from "../../Button";
import EditUserModal from "./EditUserModal";

const BACKEND_URL = "http://localhost:3002";

const DeleteUserModal = ({
  user_name,
  user_id,
  refreshUsers,
}: {
  user_name: string;
  user_id: number;
  refreshUsers: any;
}) => {
  const deleteUser = useAsync(async () => {
    try {
      const resp = await fetch(`${BACKEND_URL}/users/${user_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "delete",
      });
      console.log("response");
      console.log(await resp.json());
    } catch (error) {
      console.log(error);
    }
  });

  const handleDeleteUser = () => {
    deleteUser.call();
    refreshUsers();
  };

  const Content = () => {
    return (
      <div>
        Are you sure to delete user {user_name}???
        <br />
        <Button onClick={handleDeleteUser}>Yes, delete</Button>
      </div>
    );
  };
  return (
    <Modal openButtonText={"Delete user"} content={<Content />} fullScreen />
  );
};

const UserModal = ({
  user_id,
  isCurrentUser,
  refreshUsers,
}: {
  user_id: number;
  isCurrentUser: boolean;
  refreshUsers: any;
}) => {
  const fetchUserInfo = useAsync(async function () {
    try {
      const user = await fetch(`${BACKEND_URL}/users/${user_id}`);
      return user.json();
    } catch (error) {
      console.log(error);
    }
  });
  // console.log("fetched user");
  // console.log(fetchUserInfo.value && fetchUserInfo.value[0]);

  const Content = ({
    user,
    refreshUsers,
  }: {
    user?: TUser;
    refreshUsers: any;
  }) => {
    if (!user) return <></>;
    const date = new Date(user.date_created);
    return (
      <div>
        <h3>
          User: {user.name} {isCurrentUser && "(Current user)"}
        </h3>
        Date joined: {date.toLocaleDateString()}
        <br />
        <DeleteUserModal
          user_name={user.name}
          refreshUsers={refreshUsers}
          user_id={user.id}
        />
        <EditUserModal
          userId={user.id}
          initialValues={{
            name: user.name,
          }}
        />
      </div>
    );
  };

  return (
    <Modal
      openButtonText={"See user details"}
      onOpen={() => fetchUserInfo.call()}
      content={
        <Content
          refreshUsers={refreshUsers}
          user={(fetchUserInfo.value && fetchUserInfo.value[0]) || undefined}
        />
      }
    />
  );
};

export default UserModal;
