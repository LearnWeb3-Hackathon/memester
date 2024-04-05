import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container, Header } from "./Contact.styled";
import { usePrivy } from "@privy-io/react-auth";
import "./ImageListPage.css";
import API_URLS from "../../config.js";
 

function MyMemesList() {
	const [memes, setMemes] = useState([]);
	const [loading, setLoading] = useState(true);

	const fadeTop = {
		hidden: { opacity: 0, y: -30 },
		visible: { opacity: 1, y: 0 },
	};

	const { ready, authenticated, user, logout } = usePrivy();

	useEffect(() => {
		const fetchMemes = async () => {
			try {
				const response = await axios.get(`${API_URLS.development}/meme`);
				setMemes(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching memes:", error);
				setLoading(false);
			}
		};

		if (ready && !authenticated) {
			window.location.href = "/login";
		} else {
			fetchMemes();
		}
	}, [ready, authenticated]);

	const boxStyle = {
		width: "70%",
		margin: "0 auto",
		borderRadius: "10px",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
		padding: "20px",
		backgroundColor: "#ffffff",
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<Header>
				<motion.div
					className="header-content"
					variants={fadeTop}
					initial="hidden"
					animate="visible"
					transition={{ duration: 0.6 }}
				>
					<h2 className="">Meme List</h2>
				</motion.div>
			</Header>
			<div style={boxStyle} className="rounded-box">
				<div className="image-list">
					{memes.map((meme) => (
						<Link
							to={`/meme/${meme._id}`}
							key={meme._id}
							className="image-container"
						>
							<div className="image-box">
								<img src={meme.imagelink} alt={meme.title} />
							</div>
							<div className="image-details">
								<h3>{meme.title}</h3>
								<p>{meme.description}</p>
								<p>By: {meme.userId}</p>
							</div>
							<button className="btn btn-primary highlight share-button">
								Cast <i className="fas fa-share"></i>
							</button>
						</Link>
					))}
				</div>
			</div>
		</Container>
	);
}

export default MyMemesList;
