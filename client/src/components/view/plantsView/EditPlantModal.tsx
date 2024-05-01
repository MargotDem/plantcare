import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import PlantFormContainer from "./PlantForm";
import type { TInitialValues } from "./PlantForm";

const BACKEND_URL = "http://localhost:3002";

const EditPlantFormContainer = ({
  refreshPlants,
  plant_id,
  initialValues,
}: {
  refreshPlants: () => void;
  plant_id: number;
  initialValues: TInitialValues;
}) => {
  const editPlant = useAsync(async (formValues) => {
    try {
      const response = await fetch(`${BACKEND_URL}/plants/${plant_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "put",
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
      handlerFunction={editPlant}
      refreshPlants={refreshPlants}
      initialValues={initialValues}
    />
  );
};

const EditPlantModal = ({
  plant_id,
  initialValues,
}: {
  plant_id: number;
  initialValues: TInitialValues;
}) => {
  const Content = () => {
    return (
      <div>
        edit plant form
        <EditPlantFormContainer
          initialValues={initialValues}
          refreshPlants={() => {}}
          plant_id={plant_id}
        />
      </div>
    );
  };
  return <Modal openButtonText={"Edit plant"} content={<Content />} />;
};

export default EditPlantModal;
