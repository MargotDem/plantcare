import { useState } from "react";
import { StyledForm, StyledFormButton } from "../../Form";

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <StyledForm>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
          />
        </label>
      </StyledForm>
      <StyledFormButton type="button" onClick={(e) => handleSubmit(e)}>
        Submit
      </StyledFormButton>
    </form>
  );
};

const UserFormContainer = ({
  handlerFunction,
  initialValues,
}: {
  handlerFunction: any;
  initialValues: TInitialValues;
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();
    // TODO: validation
    handlerFunction.call(formValues);
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
