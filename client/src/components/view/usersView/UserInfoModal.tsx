import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import type { TUser } from "../../../types/usersTypes";
import EditUserModal from "./EditUserModal";
import { ModalButtonsDiv } from "../../Modal";
import DeleteUserModal from "./DeleteUserModal";

const UserModal = ({
  user_id,
  isCurrentUser,
  refreshUsers,
  setCurrentUser,
}: {
  user_id: number;
  isCurrentUser: boolean;
  refreshUsers: any;
  setCurrentUser: any;
}) => {
  const fetchUserInfo = useAsync(async function () {
    try {
      const user = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user_id}`
      );
      return user.json();
    } catch (error) {
      console.log(error);
    }
  });

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
        <ModalButtonsDiv>
          <DeleteUserModal
            user_name={user.name}
            refreshUsers={refreshUsers}
            user_id={user.id}
            setCurrentUser={setCurrentUser}
          />
          <EditUserModal
            userId={user.id}
            initialValues={{
              name: user.name,
            }}
            refreshUsers={refreshUsers}
          />
        </ModalButtonsDiv>
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
