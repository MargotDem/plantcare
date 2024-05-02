import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import PlantFormContainer from "./PlantForm";
import { addDays } from "../../../utils/addDays";

const BACKEND_URL = "http://localhost:3002";

const CreatePlantFormContainer = ({
  refreshPlants,
  user_id,
}: {
  refreshPlants: () => void;
  user_id: number;
}) => {
  const initialValues = {
    name: undefined,
    watering_frequency: undefined,
    description: undefined,
  };
  const createPlant = useAsync(async (formValues) => {
    const today = new Date();
    console.log("today is");
    console.log(today);
    console.log(
      `formvalues formValues.watering_frequency ${formValues.watering_frequency}`
    );
    const next_watering_due_date = addDays(
      today,
      Number(formValues.watering_frequency)
    );
    console.log(`watering due date ${next_watering_due_date}`);
    const newPlant = {
      ...formValues,
      next_watering_due_date,
    };
    try {
      const response = await fetch(`${BACKEND_URL}/plants/${user_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(newPlant),
      });
      console.log("response");
      const message = await response.json();
      console.log(message);
      refreshPlants();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <PlantFormContainer
      handlerFunction={createPlant}
      initialValues={initialValues}
    />
  );
};

const CreatePlantModal = ({
  refreshPlants,
  user_id,
}: {
  refreshPlants: () => void;
  user_id: number;
}) => {
  const Content = () => {
    return (
      <div>
        Create a new plant
        <br />
        <br />
        <CreatePlantFormContainer
          refreshPlants={refreshPlants}
          user_id={user_id}
        />
      </div>
    );
  };

  return <Modal openButtonText={"Add new plant"} content={<Content />} />;
};

export default CreatePlantModal;
