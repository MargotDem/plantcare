import { useAsync } from "../../../utils/useAsync";
const BACKEND_URL = "http://localhost:3002";
import { StyledFormButton } from "../../Form";
import Modal from "../../Modal";

const DeletePlantModal = ({
	plant_name,
	plant_id,
	refreshPlants,
  }: {
	plant_name: string;
	plant_id: number;
	refreshPlants: any;
  }) => {
	const deletePlant = useAsync(async () => {
	  try {
		const resp = await fetch(`${BACKEND_URL}/plants/${plant_id}`, {
		  headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		  },
		  method: "delete",
		});
		console.log("response");
		const message = await resp.json();
		console.log(message);
		refreshPlants();
	  } catch (error) {
		console.log(error);
	  }
	});
  
	const handleDeletePlant = () => {
	  deletePlant.call();
	};
  
	const Content = () => {
	  return (
		<div>
		  Are you sure to delete plant {plant_name}???
		  <br />
		  <StyledFormButton onClick={handleDeletePlant}>
			Yes, delete
		  </StyledFormButton>
		</div>
	  );
	};
	return (
	  <Modal openButtonText={"Delete plant"} content={<Content />} fullScreen />
	);
  };

export default DeletePlantModal;
