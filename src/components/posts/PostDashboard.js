import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";

const PostDashboard = () => {
	const { postId } = useParams();
	const [token, setToken] = React.useState("");
	const [id, setId] = React.useState("");
	const [data, setData] = React.useState({});
	React.useEffect(() => {
		setToken(localStorage.getItem("token"));
		setId(postId);
	}, []);
	React.useEffect(() => {
		if (token && id) {
			fetchSinglePost(id);
		}
	}, [token, id]);

	const fetchSinglePost = async (postId) => {
		try {
			const { data } = await axios.post(
				`https://logathon-posts-list.herokuapp.com/getPost`,
				{
					postId,
				},
				{
					headers: {
						"content-type": "application/json",
						token: `${token}`,
					},
				}
			);
			if (data.status === "success") {
				setData(data.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card>
			<Card.Header>
				<Card.Title>{data.text}</Card.Title>
			</Card.Header>
			<Card.Body>
				<img
					alt="this is iamge"
					src={data.imageUrl}
					style={{ height: "200px", width: "200px" }}
				/>
				<p className="text-muted">userID: {data.userId}</p>
			</Card.Body>
		</Card>
	);
};

export default PostDashboard;
