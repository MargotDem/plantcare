import UsersView from "./usersView";
import PlantsView from "./plantsView";
import ScheduleView from "./scheduleView";
import type { TCurrentUserProps } from "./usersView";
import CenteredContainer from "../CenteredContainer";

export type TViews = "users" | "plants" | "schedule";

const View = ({
  view,
  currentUser,
  setCurrentUser,
}: { view: TViews } & TCurrentUserProps) => {
  let currentView;

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
