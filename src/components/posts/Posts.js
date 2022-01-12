import axios from "axios";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Posts = ({ postsData = [], onDeleteButton, onEdit }) => {
	const [token, setToken] = React.useState("");
	// const [postsData, setPostsData] = React.useState([]);

	// React.useEffect(() => {
	// 	getAllPosts();
	// }, [token]);

	// React.useEffect(() => {
	// 	setToken(localStorage.getItem("token"));
	// }, []);

	// const getAllPosts = async () => {
	// 	try {
	// 		const { data } = await axios.get(
	// 			"https://logathon-posts-list.herokuapp.com/getallPost",
	// 			{
	// 				headers: {
	// 					"content-type": "application/json",
	// 					token: `${token}`,
	// 				},
	// 			}
	// 		);
	// 		if (data.status === "success") {
	// 			setPostsData(data.data);
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	// console.log(postsData);
	return (
		<>
			{postsData?.map((data) => (
				<Card className="my-3" key={data._id}>
					<Card.Header>
						<div className="row">
							<div className="col-6">
								<Card.Title>Post Name: {data.text}</Card.Title>
							</div>
							<div className="col-6 text-right">
								<Button
									variant="secondary"
									className="mx-2"
									onClick={() => onEdit(data)}
								>
									Edit
								</Button>
								<Button
									variant="danger"
									onClick={() => onDeleteButton(data.postId)}
								>
									Delete
								</Button>
							</div>
						</div>
					</Card.Header>
					<Link to={`/post/${data.postId}`}>
						<Card.Body>
							<img
								alt="this is iamge"
								src={data.imageUrl}
								style={{ height: "200px", width: "200px" }}
							/>
						</Card.Body>
					</Link>
				</Card>
			))}
		</>
	);
};

export default Posts;
