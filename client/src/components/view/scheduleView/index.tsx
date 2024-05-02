import { useEffect, useState } from "react";
import { useAsync } from "../../../utils/useAsync";
import type { TPlant } from "../../../types/plantsTypes";
import styled, { css } from "styled-components";
import Loading from "../../Loading";
import { addDays } from "../../../utils/addDays";
import Button from "../../Button";

const BACKEND_URL = "http://localhost:3002";

const TimeTravel = ({ today, setToday }: { today: Date; setToday: any }) => {
  const travelTime = (number: number) => {
    console.log("clicked travelTime");
    console.log(`so time now: ${today.toLocaleDateString()}`);
    const newToday = addDays(today, number);
    setToday(newToday);
  };
  return (
    <div>
      Time travel: Today is {today.toLocaleDateString()}{" "}
      <button onClick={() => travelTime(1)}>+1</button>{" "}
      <button onClick={() => travelTime(-1)}>-1</button>
    </div>
  );
};

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
  refreshPlants: any;
}) => {
  const date = new Date(plant.next_watering_due_date);
  const checkPlantWatered = useAsync(async () => {
    try {
      const next_watering_due_date = addDays(today, plant.watering_frequency);
      const response = await fetch(`${BACKEND_URL}/plants/${plant.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "put",
        body: JSON.stringify({
          next_watering_due_date,
        }),
      });
      console.log("response");
      const message = await response.json();
      console.log(message);
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
        `${BACKEND_URL}/scheduledPlantsByUserId/${currentUser}`
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

  //   const today = new Date();
  //   const today = addDays(new Date(), 3);
  console.log("today");
  console.log(today.toLocaleString());

  //   console.log(today > new Date());

  //   console.log("plants");
  //   console.log(fetchPlants.value);
  const plants = fetchPlants.value;

  const assignColor = (date1: Date, date2: Date) => {
    // return "purple"
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
