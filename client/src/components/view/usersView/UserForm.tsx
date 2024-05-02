import { useState } from "react";
import { StyledForm, StyledFormButton } from "../../Form";
import type { TInitialValues } from "./CreateUserModal";
import type { TUseAsyncReturn } from "../../../utils/useAsync";

const UserForm = ({
  handleSubmit,
  handleChange,
  formValues,
}: {
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: TInitialValues;
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
  handlerFunction: TUseAsyncReturn;
  initialValues: TInitialValues;
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: validation
    handlerFunction.call(formValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
