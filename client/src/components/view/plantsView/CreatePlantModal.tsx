import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import PlantFormContainer from "./PlantForm";

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
    try {
      const response = await fetch(`${BACKEND_URL}/plants/${user_id}`, {
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

  return (
    <PlantFormContainer
      handlerFunction={createPlant}
      refreshPlants={refreshPlants}
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
        create new plant form
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
