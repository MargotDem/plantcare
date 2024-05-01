import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import type { TPlant } from "../../../types/plantsTypes";
import type { TUser } from "../../../types/usersTypes";
import Button from "../../Button";

const BACKEND_URL = "http://localhost:3002";

const PlantModal = ({
  plant_id,
  currentUser,
  allUsers,
}: {
  plant_id: number;
  currentUser: number;
  allUsers: TUser[];
}) => {
  const fetchPlantInfo = useAsync(async function () {
    try {
      const plant = await fetch(`${BACKEND_URL}/plants/${plant_id}`);
      return plant.json();
    } catch (error) {
      console.log(error);
    }
  });
  type ContentProps = {
    plantInfo?: {
      plant: TPlant;
      users: TUser[];
    };
  };
  const Content = ({ plantInfo }: ContentProps) => {
    if (!plantInfo) return <></>;
    const { plant, users } = plantInfo;
    const date = new Date(plant.date_created);
    return (
      <div>
        <h3>Plant: {plant.name}</h3>
        Date added: {date.toLocaleString()}
        <br />
        <h4>Description:</h4>
        {plant.description ? (
          <p>{plant.description}</p>
        ) : (
          <p>(no description)</p>
        )}
        <h4>Watering frequency:</h4>
        {plant.watering_frequency}
        <br />
        <h5>Users assigned to this plant:</h5>
        <ul>
          {users.map((user, id) => {
            return (
              <li key={id}>{`${user.name}${
                currentUser === user.user_id ? " (curent user)" : ""
              }`}</li>
            );
          })}
        </ul>
        <Button>Assign another user to this plant</Button>
      </div>
    );
  };

  console.log("fetched plant");
  console.log(fetchPlantInfo.value && fetchPlantInfo.value);
  const plantInfo = (fetchPlantInfo.value && fetchPlantInfo.value) || undefined;

  return (
    <Modal
      openButtonText={"See plant details"}
      onOpen={() => fetchPlantInfo.call()}
      content={<Content plantInfo={plantInfo} />}
    />
  );
};

export default PlantModal;
