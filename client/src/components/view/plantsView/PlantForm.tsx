import { useState } from "react";
import { StyledForm, StyledFormButton } from "../../Form";

export type TInitialValues = {
  name: string | undefined;
  watering_frequency: string | undefined;
  description: string | undefined;
};

const PlantForm = ({
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
  handlerFunction: any;
  initialValues: TInitialValues;
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();
    console.log("form submitted");
    console.log(formValues);
    // validation:
    // if (formValues.watering_frequency)
    if (isNaN(Number(formValues.watering_frequency))) {
      return;
    }
    handlerFunction.call(formValues);
  };

  const handleChange = (e: any) => {
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
