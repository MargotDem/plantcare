import styled from "styled-components";
import Button from "./Button";
import type { TViews } from "./view";

const StyledNavContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  // width: 60%;
  margin: auto;
  // background-color: blue;
`;

type TNavProps = {
  view: TViews;
  setView: (view: TViews) => void;
};

const StyledNavButton = styled(Button)`
  margin: 5px;
  // font-size: small;
`;

const NavButton = ({
  view,
  setView,
  currentView,
}: TNavProps & { currentView: TViews }) => {
  return (
    <StyledNavButton
      $primary={currentView === view}
      onClick={() => setView(view)}
    >
      {view}
    </StyledNavButton>
  );
};

const NavBar = ({ view, setView }: TNavProps) => {
  return (
    <StyledNavContainer>
      <div>
        <NavButton view={"users"} currentView={view} setView={setView} />
        <NavButton view={"plants"} currentView={view} setView={setView} />
        <NavButton view={"schedule"} currentView={view} setView={setView} />
      </div>
    </StyledNavContainer>
  );
};

export default NavBar;
