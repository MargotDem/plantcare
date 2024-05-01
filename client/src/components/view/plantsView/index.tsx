import { useEffect } from "react";
import { useAsync } from "../../../utils/useAsync";
import type { TPlant } from "../../../types/plantsTypes";
import type { TUser } from "../../../types/usersTypes";
import styled from "styled-components";
import Loading from "../../Loading";
import PlantInfoModal from "./PlantInfoModal";
import CreatePlantModal from "./CreatePlantModal";

const BACKEND_URL = "http://localhost:3002";

const StyledPlantRow = styled.p<{ $highlighted?: boolean }>``;

const PlantRow = ({
  plant,
  currentUser,
  users,
}: {
  plant: TPlant;
  currentUser: number;
  users: TUser[];
}) => {
  return (
    <li>
      <StyledPlantRow>{plant.name}</StyledPlantRow>
      <PlantInfoModal
        plant_id={plant.id}
        currentUser={currentUser}
        allUsers={users}
      />
    </li>
  );
};

const PlantsView = ({ currentUser }: { currentUser: number }) => {
  const fetchPlants = useAsync(async function () {
    try {
      const plants = await fetch(
        `${BACKEND_URL}/plantsByUserId/${currentUser}`
      );
      return plants.json();
    } catch (error) {
      console.log(error);
    }
  });

  const fetchUsers = useAsync(async function () {
    try {
      const users = await fetch(`${BACKEND_URL}/users`);
      return users.json();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchPlants.call();
    fetchUsers.call();
  }, []);

  console.log("plants");
  console.log(fetchPlants.value);
  const plants = fetchPlants.value;
  const users = fetchUsers.value;
  return (
    <div>
      {fetchPlants.isPending ? (
        <Loading />
      ) : (
        <>
          <CreatePlantModal
            user_id={currentUser}
            refreshPlants={() => fetchPlants.call()}
          />
          <br />
          <br />
          <ul>
            {(plants as unknown as TPlant[])?.map((plant, id) => {
              return (
                <PlantRow
                  key={id}
                  plant={plant}
                  currentUser={currentUser}
                  users={users}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default PlantsView;
