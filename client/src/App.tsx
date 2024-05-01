import { useEffect, useState } from "react";
import { useAsync } from "./utils/useAsync";
import "./App.css";
// import TestBackend from "./testBackend";
import NavBar from "./components/NavBar";
import CenteredContainer from "./components/CenteredContainer";
import type { TViews } from "./components/view";
import View from "./components/view";
import styled from "styled-components";

const StyledTest = styled.div`
  position: relative;
  z-index: 2;
`;

const BACKEND_URL = "http://localhost:3002";

const MyApp = () => {
  const [view, setView] = useState<TViews>("users");
  const [currentUser, setCurrentUser] = useState<number>(1);
  return (
    <CenteredContainer>
      <NavBar view={view} setView={setView} />
      <View
        view={view}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </CenteredContainer>
  );
};

function App() {
  const fetchUsers = useAsync(async function () {
    try {
      let users = await fetch(`${BACKEND_URL}/health`);
      return users.json();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchUsers.call();
  }, []);

  return (
    <>
      <StyledTest>
        <MyApp />
      </StyledTest>
    </>
    // <>
    //   {fetchUsers.isPending ? (
    //     <div>Loading...</div>
    //   ) : (
    //     <>
    //       <h1>Hello</h1>
    //       <p>Message from the backend: {fetchUsers.value?.message}</p>
    //       <br />
    //       <TestBackend />
    //     </>
    //   )}
    // </>
  );
}

export default App;
