import { useEffect, useState } from "react";
import { useAsync } from "../../../utils/useAsync";
import type { TPlant } from "../../../types/plantsTypes";
import styled, { css } from "styled-components";
import Loading from "../../Loading";
import Button from "../../Button";
import TimeTravel from "./TimeTravel";
import { addDays } from "../../../utils/addDays";

const StyledPlantRow = styled.div<{ $color?: string }>`
  border-radius: 8px;
  padding: 5px;
  margin-top: 8px;
  ${(props) =>
    css`
      background: ${props.$color};
    `};
`;

const PlantRow = ({
  plant,
  color,
  today,
  refreshPlants,
}: {
  plant: TPlant;
  color: string;
  today: Date;
  refreshPlants: () => void;
}) => {
  const date = new Date(plant.next_watering_due_date);

  const checkPlantWatered = useAsync(async () => {
    try {
      const next_watering_due_date = addDays(today, plant.watering_frequency);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/plants/${plant.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "put",
          body: JSON.stringify({
            next_watering_due_date,
          }),
        }
      );
      const message = await response.json();
      console.log(message);
      // @ts-expect-error idk
      refreshPlants.call();
    } catch (e) {
      console.log(e);
    }
  });

  const handleCheck = () => {
    checkPlantWatered.call();
  };

  return (
    <StyledPlantRow $color={color}>
      {plant.name} {`(water every ${plant.watering_frequency} days) `}
      {"Next watering due: "}
      {`${date.toLocaleDateString()} `}
      <Button onClick={() => handleCheck()}>Plant watered!</Button>
    </StyledPlantRow>
  );
};

const ScheduleView = ({ currentUser }: { currentUser: number }) => {
  const [today, setToday] = useState(new Date());

  const fetchPlants = useAsync(async function () {
    try {
      const plants = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/scheduledPlantsByUserId/${currentUser}`
      );
      return plants.json();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchPlants.call();
  }, []);

  const refreshPlants = () => {
    fetchPlants.call();
  };

  const plants = fetchPlants.value;

  const assignColor = (date1: Date, date2: Date) => {
    switch (date2 < date1) {
      case true:
        return "#cf4011";
      case false:
        return "#228B22";
    }
  };

  return (
    <div>
      {fetchPlants.isPending ? (
        <Loading />
      ) : (
        <>
          <TimeTravel today={today} setToday={setToday} />
          <br />

          {(plants as unknown as TPlant[])?.map((plant, id) => {
            const color = assignColor(
              today,
              new Date(plant.next_watering_due_date)
            );
            return (
              <PlantRow
                key={id}
                plant={plant}
                color={color}
                today={today}
                refreshPlants={refreshPlants}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ScheduleView;
