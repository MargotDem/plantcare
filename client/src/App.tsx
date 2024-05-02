import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import CenteredContainer from "./components/CenteredContainer";
import type { TViews } from "./components/view";
import View from "./components/view";
import styled from "styled-components";

const StyledTest = styled.div`
  position: relative;
  z-index: 2;
`;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  // background-color: pink;

  @media only screen and (min-width: 768px) {
    width: 40vw;
    height: 70vh;
  }
`;

const MyApp = () => {
  const [view, setView] = useState<TViews>("users");

  return (
    <CenteredContainer>
      <AppContainer>
        <NavBar view={view} setView={setView} />
        <View view={view} />
      </AppContainer>
    </CenteredContainer>
  );
};

function App() {
  return (
    <>
      <StyledTest>
        <MyApp />
      </StyledTest>
    </>
  );
}

export default App;
