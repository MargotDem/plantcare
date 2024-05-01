import Modal from "../../Modal";
import { useAsync } from "../../../utils/useAsync";
import type { TUser } from "../../../types/usersTypes";

const BACKEND_URL = "http://localhost:3002";

const UserModal = ({
  user_id,
  isCurrentUser,
}: {
  user_id: number;
  isCurrentUser: boolean;
}) => {
  const fetchUserInfo = useAsync(async function () {
    try {
      const user = await fetch(`${BACKEND_URL}/users/${user_id}`);
      return user.json();
    } catch (error) {
      console.log(error);
    }
  });
  console.log("fetched user");
  console.log(fetchUserInfo.value && fetchUserInfo.value[0]);

  const Content = ({ user }: { user?: TUser }) => {
    if (!user) return <></>;
    const date = new Date(user.date_created);
    return (
      <div>
        <h3>
          User: {user.name} {isCurrentUser && "(Current user)"}
        </h3>
        Date joined: {date.toLocaleString()}
      </div>
    );
  };

  return (
    <Modal
      openButtonText={"See user details"}
      onOpen={() => fetchUserInfo.call()}
      content={
        <Content
          user={(fetchUserInfo.value && fetchUserInfo.value[0]) || undefined}
        />
      }
    />
  );
};

export default UserModal;
