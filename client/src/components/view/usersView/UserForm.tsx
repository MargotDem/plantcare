import { useState } from "react";
import Button from "../../Button";

export type TInitialValues = {
  name: string | undefined;
};

const UserForm = ({
  handleSubmit,
  handleChange,
  formValues,
}: {
  handleSubmit: any;
  handleChange: any;
  formValues: any; // TODO
}) => {
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

const UserFormContainer = ({
  handlerFunction,
  refreshUsers,
  initialValues,
}: {
  handlerFunction: any;
  refreshUsers: () => void;
  initialValues: TInitialValues;
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();
    console.log("form submitted");
    console.log(formValues);
    // validation:
    handlerFunction.call(formValues);
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
    <UserForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formValues={formValues}
    />
  );
};

export default UserFormContainer;
