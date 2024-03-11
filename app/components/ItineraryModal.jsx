import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ItineraryModal(props) {
  const handleClose = () => {
    props.reverse({ onActive: false, holdID: -1 });
  };

  const handleVolunteerPop = (id, editLocation) => {
    props.reverse({ onActive: true, holdId: id, location: editLocation });
  };

  return (
    <>
      <Modal show={props.value} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "25px" }}>
          {" "}
           Create a Packing list{" "}
          <Button
            style={{ marginLeft: "9rem" }}
            variant="primary"
            onClick={(event) => {
              handleVolunteerPop(props.value2.vol, "Packaging");
            }}
          >
            Select
          </Button>
        </Modal.Body>
        <hr />
        <Modal.Body style={{ fontSize: "25px" }}>
          {" "}
          Create a Itinerary{" "}
          <Button
            style={{ marginLeft: "9rem" }}
            variant="primary"
            onClick={(event) => {
              handleVolunteerPop(props.value2.vol, "Itinerary");
            }}
          >
            Select
          </Button>
        </Modal.Body>
        <hr />
        <Modal.Body style={{ fontSize: "25px" }}>
          {" "}
          Manage planning{" "}
          <Button
            style={{ marginLeft: "9rem" }}
            variant="primary"
            onClick={(event) => {
              handleVolunteerPop(props.value2.vol, "Planning");
            }}
          >
            Select
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ItineraryModal;