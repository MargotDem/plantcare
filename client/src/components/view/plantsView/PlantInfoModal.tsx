import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import type { TPlant } from "../../../types/plantsTypes";
import type { TUser } from "../../../types/usersTypes";
import EditPlantModal from "./EditPlantModal";
import { ModalButtonsDiv } from "../../Modal";
import DeletePlantModal from "./DeletePlantModal";
import { useState } from "react";

const AddUserSelect = ({
  allUsers,
  plant_id,
}: // setPlantUsers,
// plantUsers,
{
  allUsers: TUser[];
  plant_id: number;
  // setPlantUsers: any;
  // plantUsers: any;
}) => {
  const handleAssignUserToPlant = async (user_id: number) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/assignUserToPlant/${user_id}/${plant_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "post",
        }
      );
      const message = await res.json();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <label htmlFor="allUsers">Assign another user to this plant:</label>
      <select
        name="allUsers"
        id="allUsers"
        onChange={(e) => handleAssignUserToPlant(Number(e.target.value))}
      >
        <option>choose</option>
        {allUsers.map((u, id) => (
          <option key={id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
    </>
  );
};

const PlantModal = ({
  plant_id,
  currentUser,
  allUsers,
  refreshPlants,
}: {
  plant_id: number;
  currentUser: number;
  allUsers: TUser[];
  refreshPlants: any;
}) => {
  const fetchPlantInfo = useAsync(async function () {
    try {
      const plant = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/plants/${plant_id}`
      );
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
    refreshPlants: any;
  };
  const Content = ({ plantInfo, refreshPlants }: ContentProps) => {
    if (!plantInfo) return <></>;
    const { plant, users } = plantInfo;
    const [plantUsers, setPlantUsers] = useState(users);
    const date = new Date(plant.date_created);
    return (
      <div>
        <h3>Plant: {plant.name}</h3>
        Date added: {date.toLocaleDateString()}
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
          {plantUsers.map((user, id) => {
            return (
              <li key={id}>{`${user.name}${
                currentUser === user.user_id ? " (curent user)" : ""
              }`}</li>
            );
          })}
        </ul>
        <AddUserSelect
          allUsers={allUsers}
          plant_id={plant.id}
          // refreshPlants={refreshPlants}
          // setPlantUsers={setPlantUsers}
        />
        <br />
        <ModalButtonsDiv>
          <DeletePlantModal
            plant_id={plant.id}
            plant_name={plant.name}
            refreshPlants={refreshPlants}
          />
          <EditPlantModal
            refreshPlants={refreshPlants}
            plant_id={plant.id}
            initialValues={{
              name: plant.name,
              description: plant.description,
              watering_frequency: plant.watering_frequency.toString(),
            }}
          />
        </ModalButtonsDiv>
      </div>
    );
  };

  const plantInfo = (fetchPlantInfo.value && fetchPlantInfo.value) || undefined;

  return (
    <Modal
      openButtonText={"See plant details"}
      onOpen={() => fetchPlantInfo.call()}
      content={<Content plantInfo={plantInfo} refreshPlants={refreshPlants} />}
    />
  );
};

export default PlantModal;
