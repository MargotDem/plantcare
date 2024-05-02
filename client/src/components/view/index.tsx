import UsersView from "./usersView";
import PlantsView from "./plantsView";
import ScheduleView from "./scheduleView";
import CenteredContainer from "../CenteredContainer";
import { useState } from "react";

export type TViews = "users" | "plants" | "schedule";

const View = ({ view }: { view: TViews }) => {
  let currentView;
  const [currentUser, setCurrentUser] = useState<number>(0);

  switch (view) {
    case "users":
      currentView = (
        <UsersView currentUser={currentUser} setCurrentUser={setCurrentUser} />
      );
      break;
    case "plants":
      currentView = <PlantsView currentUser={currentUser} />;
      break;
    case "schedule":
      currentView = <ScheduleView currentUser={currentUser} />;
      break;
  }
  return (
    <CenteredContainer>
      <h4>{currentView}</h4>
    </CenteredContainer>
  );
};

export default View;
