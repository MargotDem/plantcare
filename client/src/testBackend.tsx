const BACKEND_URL = "http://localhost:3002";

/*
User routes:

usersRouter.get("/users", usersController.getUsers);

usersRouter.post("/users", usersController.createUser);

usersRouter.get("/users/:id", usersController.getUserById);

usersRouter.delete("/users/:id", usersController.deleteUser);

usersRouter.put("/users/:id", usersController.updateUser);

Plant routes:


*/

// yes
const getUsers = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`);
    console.log("response");
    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
};

// yes
const createUser = async () => {
  const newUser = {
    name: "margot",
  };
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(newUser),
    });
    console.log("response");
    const message = await response.json();
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

// yes
const getUserById = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/${3}`);
    console.log("response");
    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
};

// yes
const deleteUser = async () => {
  const id = 3;
  try {
    const resp = await fetch(`${BACKEND_URL}/users/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "delete",
    });
    console.log("response");
    console.log(await resp.json());
  } catch (error) {
    console.log(error);
  }
};

// yes
const updateUser = async () => {
  const id = 4;
  const updatedUser = {
    name: "margoton",
  };
  try {
    const res = await fetch(`${BACKEND_URL}/users/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "put",
      body: JSON.stringify(updatedUser),
    });
    console.log("response");
    console.log(await res.json());
  } catch (error) {
    console.log(error);
  }
};

// 
const createPlant = async () => {
  const newPlant = {
    name: "plante autre",
    description: "une autre plante",
    watering_frequency: 3,
  };
  try {
    const response = await fetch(`${BACKEND_URL}/plants/4`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(newPlant),
    });
    console.log("response");
    const message = await response.json();
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

// yes
const assignUserToPlant = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/assignUserToPlant/2/8`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
    });
    console.log("response");
    const message = await response.json();
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}

const TestBackend = () => {
  function testBackend() {
    assignUserToPlant();
  }
  return <button onClick={() => testBackend()}>Test backend</button>;
};

export default TestBackend;
