import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import PlantFormContainer from "./PlantForm";
import { addDays } from "../../../utils/addDays";

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
    const next_watering_due_date = addDays(
      today,
      Number(formValues.watering_frequency)
    );
    const newPlant = {
      ...formValues,
      next_watering_due_date,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/plants/${user_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify(newPlant),
        }
      );
      const res = await response.json();
      console.log(res);
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
