import React from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [formValidated, setFormValidated] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const [formData, setFormData] = React.useState({
		emailID: "",
		password: "",
	});
	const handleLoginSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		if (e.currentTarget.checkValidity()) {
			const { data } = await axios.post(
				"https://logathon-signin.herokuapp.com/web/login",
				{
					...formData,
				}
			);

			if (data.status === "success") {
				localStorage.setItem("token", data.token);
				navigate("/profile");
			}
		} else {
			setFormValidated(true);
		}
		setIsLoading(false);
	};
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
								<h1 className="h3 text-center">Login</h1>
								<Form
									onSubmit={handleLoginSubmit}
									noValidate
									validated={formValidated}
								>
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

									<div className="text-center mt-2">
										<Button type="submit">Login</Button>
									</div>
								</Form>
								<div className="row mt-3">
									<div className="col text-center">
										Don't have an account ? <Link to="/">Sign Up</Link>
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

export default Login;
