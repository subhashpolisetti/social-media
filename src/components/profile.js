import axios from "axios";
import React from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import CreatePost from "./posts/createPost";
import Posts from "./posts/Posts";
import WelcomModel from "./posts/WelcomModel";

const Profile = () => {
	const [token, setToken] = React.useState("");
	const [userData, setUserData] = React.useState({});
	const [isLoading, setIsLoading] = React.useState(false);
	const [showWelcomeModal, setShowWelcomeModal] = React.useState(true);

	React.useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, []);

	React.useEffect(() => {
		fetchUserDetails();
	}, [token]);

	const fetchUserDetails = async () => {
		setIsLoading(true);
		const { data } = await axios.get(
			"https://logathon-signup.herokuapp.com/user/profile",
			{
				headers: {
					"content-type": "application/json",
					token: `${token}`,
				},
			}
		);
		if (data.status === "success") {
			setUserData(data.data);
		}
		setIsLoading(false);
	};

	console.log(userData);

	return (
		<>
			{" "}
			<div style={{ maxWidth: "800px", margin: "auto" }} className="mt-4">
				{isLoading && (
					<div className="d-flex align-items-center justify-content-center">
						<Spinner animation="border" variant="primary" />
					</div>
				)}
				{!isLoading && (
					<>
						<Card>
							<Card.Header>
								<Card.Title>Profile</Card.Title>
							</Card.Header>
							<Card.Body>
								<div className="row">
									<div className="col-6">
										<p>
											{" "}
											<b>UserId</b>
										</p>
									</div>
									<div className="col-6">{userData?.userId}</div>
									<div className="col-6">
										<p>
											{" "}
											<b>Name</b>
										</p>
									</div>
									<div className="col-6">{userData?.name}</div>
									<div className="col-6">
										<p>
											{" "}
											<b>Mobile Number</b>
										</p>
									</div>
									<div className="col-6">{userData?.mobile}</div>
									<div className="col-6">
										<p>
											{" "}
											<b>EmailID</b>
										</p>
									</div>
									<div className="col-6">{userData?.emailID}</div>
									<div className="col-6">
										<p>
											{" "}
											<b>Profile</b>
										</p>
									</div>
									<div className="col-6">{userData?.profile}</div>
								</div>
							</Card.Body>
						</Card>
						<Card className="mt-3">
							<Card.Header>
								<Card.Title>Create Post</Card.Title>
							</Card.Header>
							<Card.Body>
								<CreatePost />
							</Card.Body>
						</Card>
					</>
				)}
			</div>
			<WelcomModel
				show={showWelcomeModal}
				handleClose={() => setShowWelcomeModal(false)}
			/>
		</>
	);
};

export default Profile;
