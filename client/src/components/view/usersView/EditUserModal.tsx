import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import UserFormContainer from "./UserForm";
import type { TInitialValues } from "./UserForm";

const EditUserFormContainer = ({
  refreshUsers,
  userId,
  initialValues,
}: {
  refreshUsers: () => void;
  userId: number;
  initialValues: TInitialValues;
}) => {
  const editUser = useAsync(async (formValues) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "put",
          body: JSON.stringify(formValues),
        }
      );
      const message = await response.json();
      console.log(message);
      refreshUsers();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <UserFormContainer
      handlerFunction={editUser}
      initialValues={initialValues}
    />
  );
};

const EditUserModal = ({
  userId,
  initialValues,
  refreshUsers,
}: {
  userId: number;
  initialValues: TInitialValues;
  refreshUsers: any;
}) => {
  const Content = () => {
    return (
      <div>
        Edit the user's information
        <br />
        <br />
        <EditUserFormContainer
          initialValues={initialValues}
          refreshUsers={refreshUsers}
          userId={userId}
        />
      </div>
    );
  };
  return <Modal openButtonText={"Edit user"} content={<Content />} />;
};

export default EditUserModal;
