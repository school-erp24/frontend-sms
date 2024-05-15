import { Modal, Button } from "react-bootstrap";

export const ViewImage = ({ documentModal, setDocumentModal, data }) => {
	return (
		<Modal
			className="fade"
			show={documentModal}
			onHide={() => setDocumentModal(false)}
			centered
		>
			<Modal.Header>
				<Modal.Title>Document: {data.name} </Modal.Title>
				<Button
					variant=""
					className="btn-close"
					onClick={() => setDocumentModal(false)}
				></Button>
			</Modal.Header>
			<Modal.Body>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
					}}
				>
					{data.src !== "" ? (
						<img
							src={data.src}
							alt="Uploaded Image"
							style={{ maxWidth: "70%", maxHeight: "90%" }}
						/>
					) : (
						<p>No image uploaded</p>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => setDocumentModal(false)} variant="danger light">
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
