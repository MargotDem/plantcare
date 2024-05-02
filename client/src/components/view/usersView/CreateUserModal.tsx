import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import UserFormContainer from "./UserForm";

const BACKEND_URL = "http://localhost:3002";

const CreateUserFormContainer = ({
  refreshUsers,
  setCurrentUser,
}: {
  refreshUsers: () => void;
  setCurrentUser: any;
}) => {
  const initialValues = {
    name: undefined,
  };
  const createUser = useAsync(async (formValues) => {
    console.log("heereee");
    try {
      const response = await fetch(`${BACKEND_URL}/users`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(formValues),
      });
      console.log("response");
      const { message, newUserId } = await response.json();
      console.log(message);
      refreshUsers();
      setCurrentUser(newUserId);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <UserFormContainer
      handlerFunction={createUser}
      initialValues={initialValues}
    />
  );
};

const CreateUserModal = ({
  refreshUsers,
  setCurrentUser,
}: {
  refreshUsers: () => void;
  setCurrentUser: any;
}) => {
  const Content = () => {
    return (
      <div>
        Create a new user
        <br />
        <br />
        <CreateUserFormContainer
          refreshUsers={refreshUsers}
          setCurrentUser={setCurrentUser}
        />
      </div>
    );
  };

  return <Modal openButtonText={"Add new user"} content={<Content />} />;
};

export default CreateUserModal;
