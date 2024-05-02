import { useState } from "react";
import { StyledForm, StyledFormButton } from "../../Form";
import type { TUseAsyncReturn } from "../../../utils/useAsync";
import type { TInitialValues } from "./CreatePlantModal";

const PlantForm = ({
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
      onSubmit={(e: React.FormEvent) => {
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
        <label>
          Watering frequency:
          <input
            name="watering_frequency"
            type="text"
            value={formValues.watering_frequency}
            onChange={handleChange}
          />
        </label>
        <label>
          Description*:
          <input
            name="description"
            type="text"
            value={formValues.description}
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

const PlantFormContainer = ({
  handlerFunction,
  initialValues,
}: {
  handlerFunction: TUseAsyncReturn;
  initialValues: TInitialValues;
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: validation for all forms
    if (isNaN(Number(formValues.watering_frequency))) {
      return;
    }
    handlerFunction.call(formValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PlantForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formValues={formValues}
    />
  );
};

export default PlantFormContainer;
