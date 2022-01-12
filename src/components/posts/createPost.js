import axios from "axios";
import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Posts from "./Posts";

const CreatePost = () => {
	const [base64, setBase64] = React.useState("");
	const [imageURL, setImageURL] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [formValidated, setFormValidated] = React.useState(false);
	const [token, setToken] = React.useState("");
	const [postsData, setPostsData] = React.useState([]);
	const [isEdit, setIsEdit] = React.useState(false);
	const [postId, setPostId] = React.useState("");
	const [data, setData] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);

	const fileUpload = async (e) => {
		let file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = _handleReaderLoaded;
			reader.readAsDataURL(file);
		}
	};

	const _handleReaderLoaded = (readerEvt) => {
		let binaryString = readerEvt.target.result;
		setBase64(binaryString);
	};
	React.useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, []);

	React.useEffect(() => {
		getAllPosts();
	}, [token]);

	React.useEffect(() => {
		uploadImageFile(base64);
	}, [base64]);

	const uploadImageFile = async (base64) => {
		setIsLoading(true);
		const { data } = await axios.post(
			"https://developer.lifeofgirl.org/api/v2/imageUpload",
			{ base64Data: base64 }
		);
		setImageURL(data.imageUrl);
		setIsLoading(false);
	};

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		let url = isEdit
			? "https://logathon-posts.herokuapp.com/editPost"
			: "https://logathon-posts.herokuapp.com/createPost";
		let valueData = isEdit
			? {
					...data,
					text: description,
					imageUrl: imageURL,
					postId: postId,
			  }
			: {
					text: description,
					imageUrl: imageURL,
			  };

		if (e.currentTarget.checkValidity()) {
			await axios.post(url, valueData, {
				headers: {
					"content-type": "application/json",
					token: `${token}`,
				},
			});
		}
		setImageURL("");
		setDescription("");
		getAllPosts();
		setIsEdit(false);
		setPostId("");
		setIsLoading(false);
	};

	const getAllPosts = async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.get(
				"https://logathon-posts-list.herokuapp.com/getallPost",
				{
					headers: {
						"content-type": "application/json",
						token: `${token}`,
					},
				}
			);
			if (data.status === "success") {
				setPostsData(data.data);
			}
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	const onDeleteButton = async (id) => {
		setIsLoading(true);
		try {
			await axios.delete(
				`https://logathon-posts.herokuapp.com/deletePost`,
				{
					postId: id,
				},

				{
					headers: {
						"content-type": "application/json",
						token: `${token}`,
					},
				}
			);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	const onEdit = async (data) => {
		setDescription(data.text);
		setImageURL(data.imageUrl);
		setIsEdit(true);
		setData(data);
		setPostId(data._id);
	};

	return (
		<>
			{isLoading && (
				<div className="d-flex align-items-center justify-content-center">
					<Spinner animation="border" variant="primary" />
				</div>
			)}
			{!isLoading && (
				<>
					<div>
						<Form onSubmit={handleSubmit} noValidate validated={formValidated}>
							<Form.Group>
								<Form.Label>Upload Image</Form.Label>
								<Form.Control type="file" onChange={fileUpload}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Write Description</Form.Label>
								<Form.Control
									as="textarea"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								></Form.Control>
								<Form.Control.Feedback type="invalid">
									Please Enter Description
								</Form.Control.Feedback>
							</Form.Group>
							<Button type="submit" className="mt-3">
								Create Post
							</Button>
						</Form>
					</div>
					<Posts
						postsData={postsData}
						onDeleteButton={onDeleteButton}
						onEdit={onEdit}
					/>
				</>
			)}
		</>
	);
};

export default CreatePost;
