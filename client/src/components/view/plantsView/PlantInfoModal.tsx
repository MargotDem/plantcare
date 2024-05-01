import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import type { TPlant } from "../../../types/plantsTypes";
import type { TUser } from "../../../types/usersTypes";
import Button from "../../Button";
import EditPlantModal from "./EditPlantModal";

const BACKEND_URL = "http://localhost:3002";

const DeletePlantModal = ({
  plant_name,
  plant_id,
  refreshUsers,
}: {
  plant_name: string;
  plant_id: number;
  refreshUsers: any;
}) => {
  const deletePlant = useAsync(async () => {
    try {
      const resp = await fetch(`${BACKEND_URL}/plants/${plant_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "delete",
      });
      console.log("response");
      console.log(await resp.json());
    } catch (error) {
      console.log(error);
    }
  });

  const handleDeletePlant = () => {
    deletePlant.call();
    refreshUsers();
  };

  const Content = () => {
    return (
      <div>
        Are you sure to delete plant {plant_name}???
        <br />
        <Button onClick={handleDeletePlant}>Yes, delete</Button>
      </div>
    );
  };
  return (
    <Modal openButtonText={"Delete plant"} content={<Content />} fullScreen />
  );
};

const AddUserSelect = ({
  allUsers,
  plant_id,
}: {
  allUsers: TUser[];
  plant_id: number;
}) => {
  const handleAssignUserToPlant = async (user_id: number) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/assignUserToPlant/${user_id}/${plant_id}`,
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
        <AddUserSelect allUsers={allUsers} plant_id={plant.id} />
        <br />
        <DeletePlantModal
          plant_id={plant.id}
          plant_name={plant.name}
          refreshUsers={() => {}}
        />
        <EditPlantModal
          plant_id={plant.id}
          initialValues={{
            name: plant.name,
            description: plant.description,
            watering_frequency: plant.watering_frequency.toString(),
          }}
        />
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
