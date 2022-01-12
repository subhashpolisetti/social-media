import React from "react";
import { Button, Modal } from "react-bootstrap";

const WelcomModel = ({ show, handleClose }) => {
	return (
		<Modal show={show} handleClose={handleClose} centered>
			<Modal.Body>
				<h4 className="h4">You Have logged in successfully</h4>
			</Modal.Body>
			<Modal.Footer className="text-right">
				<Button onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default WelcomModel;
