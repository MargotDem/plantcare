import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import type { TUser } from "../../../types/usersTypes";
import { useState } from "react";
import Button from "../../Button";

const BACKEND_URL = "http://localhost:3002";

const CreateUserFormContainer = ({ refreshUsers }: { refreshUsers: () => void }) => {
  const [formValues, setFormValues] = useState({
    name: undefined,
  });

  const createUser = useAsync(async () => {
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
      const message = await response.json();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  });

  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();
    console.log("form submitted");
    console.log(formValues);
    createUser.call();
    //?? TODO only when create call is returned
    refreshUsers();
  };

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          name="name"
          type="text"
          value={formValues.name}
          onChange={handleChange}
        />
      </label>
      <Button type="button" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
      <input type="submit" value="Submit" />
    </form>
  );
};

const CreateUserModal = ({ refreshUsers }: { refreshUsers: () => void }) => {
  const Content = () => {
    return (
      <div>
        create new user form
        <CreateUserFormContainer refreshUsers={refreshUsers} />
      </div>
    );
  };

  return (
    <Modal
      openButtonText={"Add new user"}
      //   onOpen={() => createUser.call()}
      content={<Content />}
    />
  );
};

export default CreateUserModal;
