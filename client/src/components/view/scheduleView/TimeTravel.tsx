import { addDays } from "../../../utils/addDays";

const TimeTravel = ({ today, setToday }: { today: Date; setToday: any }) => {
  const travelTime = (number: number) => {
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

export default TimeTravel;
