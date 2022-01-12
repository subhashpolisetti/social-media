import React from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = () => {
	
	const [formValidated, setFormValidated] = React.useState(false);
	const [formData, setFormData] = React.useState({
		emailID: "",
		password: "",
		name: "",
		mobile: "",
	});
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const handleLoginSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		console.log("it is executing");
		console.log(e.currentTarget.checkValidity());
		if (e.currentTarget.checkValidity()) {
			if (confirmPassword === formData.password) {
				const { data } = await axios.post(
					"https://logathon-signup.herokuapp.com/web/signup",
					{
						...formData,
					}
				);

			}
		} else {
			setFormValidated(true);
		}
		setIsLoading(false);
	};
	console.log(formData, confirmPassword);
	return (
		<div className="row" style={{ height: "98vh", overflowX: "hidden" }}>
			<div className="offset-3 col-6 align-self-center">
				{isLoading && (
					<div className="d-flex align-items-center justify-content-center">
						<Spinner animation="border" variant="primary" />
					</div>
				)}
				{!isLoading && (
					<>
						<Card>
							<Card.Body>
								<h1 className="h3 text-center">Sign Up</h1>
								<Form
									onSubmit={handleLoginSubmit}
									noValidate
									validated={formValidated}
								>
									<Form.Group controlId="fullname">
										<Form.Label>Full Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="Full Name"
											id="fullname"
											required
											value={formData?.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
										/>
										<Form.Control.Feedback type="invalid">
											Please Enter Full Name
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="email">
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											placeholder="Email"
											id="email"
											value={formData?.emailID}
											onChange={(e) =>
												setFormData({ ...formData, emailID: e.target.value })
											}
											required
										/>
										<Form.Control.Feedback type="invalid">
											Please Enter Email
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="phone">
										<Form.Label>Phone</Form.Label>
										<Form.Control
											type="text"
											placeholder="Phone Number"
											id="phone"
											value={formData?.mobile}
											onChange={(e) =>
												setFormData({ ...formData, mobile: e.target.value })
											}
											required
										/>
										<Form.Control.Feedback type="invalid">
											Please Enter Phone Number
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="password">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											placeholder="Password"
											id="password"
											value={formData?.password}
											onChange={(e) =>
												setFormData({ ...formData, password: e.target.value })
											}
											required
										/>
										<Form.Control.Feedback type="invalid">
											Please Enter Password
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="confirmPassword">
										<Form.Label>Confirm Password</Form.Label>
										<Form.Control
											type="password"
											placeholder="Confirm Password"
											id="password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
										/>
									</Form.Group>
									<div className="text-center mt-2">
										<Button type="submit">Sign Up</Button>
									</div>
								</Form>
								<div className="row mt-3">
									<div className="col text-center">
										Once Click On signup then click on Login Button/Already have an account ? <Link to="/login">Login</Link>
									</div>
								</div>
							</Card.Body>
						</Card>
					</>
				)}
			</div>
		</div>
	);
};

export default SignUp;
