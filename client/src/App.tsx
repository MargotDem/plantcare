import { useEffect, useState } from "react";
import { useAsync } from "./utils/useAsync";
import "./App.css";
// import TestBackend from "./testBackend";
import NavBar from "./components/NavBar";
import UsersView from "./components/UsersView";

import styled from "styled-components";
import type { TViews } from "./components/NavBar";

const BACKEND_URL = "http://localhost:3002";

const CenteredContainer = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const View = ({ view }: { view: TViews }) => {
  let currentView;

  switch (view) {
    case "users":
      currentView = <UsersView />;
      break;
    case "plants":
      currentView = "PLANTS";
      break;
    case "schedule":
      currentView = "SCHEDULE";
      break;
  }
  return (
    <CenteredContainer>
      <h4>{currentView}</h4>
    </CenteredContainer>
  );
};

const MyApp = () => {
  const [view, setView] = useState<TViews>("users");
  return (
    <CenteredContainer>
      <NavBar view={view} setView={setView} />
      <View view={view} />
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
      <MyApp />
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
