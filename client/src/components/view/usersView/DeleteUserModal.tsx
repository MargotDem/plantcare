import { StyledFormButton } from "../../Form";
import { useAsync } from "../../../utils/useAsync";
import Modal from "../../Modal";

const DeleteUserModal = ({
  user_name,
  user_id,
  refreshUsers,
}: {
  user_name: string;
  user_id: number;
  refreshUsers: () => void;
}) => {
  const deleteUser = useAsync(async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "delete",
        }
      );
      const message = await resp.json();
      console.log(message);
      refreshUsers();
    } catch (error) {
      console.log(error);
    }
  });

  const handleDeleteUser = () => {
    deleteUser.call();
  };

  const Content = () => {
    return (
      <div>
        Are you sure to delete user {user_name}???
        <br />
        <StyledFormButton onClick={handleDeleteUser}>
          Yes, delete
        </StyledFormButton>
      </div>
    );
  };
  return (
    <Modal openButtonText={"Delete user"} content={<Content />} fullScreen />
  );
};

export default DeleteUserModal;
