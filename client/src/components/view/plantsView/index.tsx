import { useEffect, useState } from "react";
import { useAsync } from "../../../utils/useAsync";
import type { TPlant } from "../../../types/plantsTypes";
import type { TUser } from "../../../types/usersTypes";
import styled from "styled-components";
import Loading from "../../Loading";
import PlantInfoModal from "./PlantInfoModal";
import CreatePlantModal from "./CreatePlantModal";

const StyledPlantRow = styled.div`
  border-radius: 8px;
  padding: 5px;
  margin-top: 8px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  background-color: #424242;
  // background-color: #228b22;
`;

const PlantRow = ({
  plant,
  currentUser,
  users,
  refreshPlants,
}: {
  plant: TPlant;
  currentUser: number;
  users: TUser[];
  refreshPlants: () => void;
}) => {
  return (
    <StyledPlantRow>
      <p>{`${plant.name}`}</p>
      &nbsp;
      <PlantInfoModal
        plant_id={plant.id}
        currentUser={currentUser}
        allUsers={users}
        refreshPlants={refreshPlants}
      />
    </StyledPlantRow>
  );
};

const PlantsView = ({ currentUser }: { currentUser: number }) => {
  const [plants, setPlants] = useState<TPlant[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);

  const fetchPlants = useAsync(async function () {
    try {
      const plants = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/plantsByUserId/${currentUser}`
      );
      return plants.json();
    } catch (error) {
      console.log(error);
    }
  });

  const fetchUsers = useAsync(async function () {
    try {
      const users = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`);
      return users.json();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchPlants.call();
    fetchUsers.call();
  }, []);

  const refreshPlants = () => {
    fetchPlants.call();
  };

  useEffect(() => {
    setPlants(fetchPlants.value);
  }, [fetchPlants.value]);

  useEffect(() => {
    setUsers(fetchUsers.value);
  }, [fetchUsers.value]);

  return (
    <div>
      {fetchPlants.isPending ? (
        <Loading />
      ) : (
        <>
          <CreatePlantModal
            user_id={currentUser}
            refreshPlants={refreshPlants}
          />
          <br />
          <br />
          {plants?.map((plant, id) => {
            return (
              <PlantRow
                key={id}
                plant={plant}
                currentUser={currentUser}
                users={users}
                refreshPlants={refreshPlants}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default PlantsView;
