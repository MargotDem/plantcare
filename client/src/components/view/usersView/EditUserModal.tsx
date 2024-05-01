import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import UserFormContainer from "./UserForm";
import type { TInitialValues } from "./UserForm";

const BACKEND_URL = "http://localhost:3002";

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
      const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "put",
        body: JSON.stringify(formValues),
      });
      console.log("response");
      const message = await response.json();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <UserFormContainer
      handlerFunction={editUser}
      refreshUsers={refreshUsers}
      initialValues={initialValues}
    />
  );
};

const EditUserModal = ({
  userId,
  initialValues,
}: {
  userId: number;
  initialValues: TInitialValues;
}) => {
  const Content = () => {
    return (
      <div>
        edit user form
        <EditUserFormContainer
          initialValues={initialValues}
          refreshUsers={() => {}}
          userId={userId}
        />
      </div>
    );
  };
  return <Modal openButtonText={"Edit user"} content={<Content />} />;
};

export default EditUserModal;
