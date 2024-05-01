import styled from "styled-components";
import Button from "./Button";

const NavContainer = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export type TViews = "users" | "plants" | "schedule";

type TNavProps = {
  view: TViews;
  setView: (view: TViews) => void;
};

const NavButton = ({
  view,
  setView,
  currentView,
}: TNavProps & { currentView: TViews }) => {
  return (
    <Button $primary={currentView === view} onClick={() => setView(view)}>
      {view}
    </Button>
  );
};

const NavBar = ({ view, setView }: TNavProps) => {
  return (
    <NavContainer>
      <NavButton view={"users"} currentView={view} setView={setView} />
      <NavButton view={"plants"} currentView={view} setView={setView} />
      <NavButton view={"schedule"} currentView={view} setView={setView} />
    </NavContainer>
  );
};

export default NavBar;
