import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Header } from "./Contact.styled";
import API_URLS from "../../config.js";
import { useTableland } from "../../contexts/Tableland";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";


	const boxStyle = {
		width: "70%",
		margin: "0 auto",
		borderRadius: "10px",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
		padding: "20px",
		backgroundColor: "#ffffff",
	};
function Contest() {
	const { id } = useParams(); // Get the ID parameter from the URL

	const fadeTop = {
		hidden: { opacity: 0, y: -30 },
		visible: { opacity: 1, y: 0 },
	};

	const [contest, setContest] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchContest = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_FRAME_URL}/api/contest/${id}`,
				);
				setContest(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching contest:", error);
				setLoading(false);
			}
		};

		fetchContest();
	}, [id]); // Fetch data whenever the ID parameter changes

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!contest) {
		return <div>Contest not found</div>;
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
				></motion.div>
			</Header>

			<div style={boxStyle} className="rounded-box">
				<div
					style={{
						display: "flex",
						margin: "20px",
						justifyContent: "space-between",
					}}
				>
					<div style={{ width: "500px" }}>
						<h2 style={{}}>{contest.title}</h2>
						<img
							style={{
								marginTop: "10px",
								marginBottom: "10px",
								borderRadius: "10px",
								width: "400px",
							}}
							src={contest.imageUrl}
							alt={contest.title}
						/>

						<p style={{ textAlign: "justify" }}>
							<b> Description : </b>
							{contest.description}
							In publishing and graphic design, Lorem ipsum is a placeholder
							text commonly used to demonstrate the visual form of a document or
							a typeface without relying on meaningful content. Lorem ipsum may
							be used as a placeholder before the final copy is available.
						</p>
						<h2 style={{ marginTop: "40px" }}>Participants</h2>
						<p style={{ marginTop: "10px" }}>
							<b>1st : </b>0x20613aB...c8697
						</p>
						<p>
							<b>2nd : </b>0x20613aB...c8697
						</p>
						<p>
							<b>3rd : </b>0x20613aB...c8697
						</p>
					</div>
					<div>
						<div style={{ marginTop: "10px" }}>
							<h2>Schedule</h2>

							<p style={{ marginTop: "10px" }}>
								<b> Started At : </b> {contest.startedAt}
							</p>
							<p>
								<b>Ended At : </b> {contest.endedAt}
							</p>
						</div>
						<div style={{ marginTop: "20px" }}>
							{/* <button className="btn btn-primary" type="submit">
								<b> Participate Now</b>
							</button>{" "} */}
							<Link to={`/participate/${contest._id}`} key={contest._id}>
								<button
									
									className="btn btn-primary"
								>
									Participate 
								</button>
							</Link>
							{" "}
							<button className="btn btn-secondary" type="submit">
								<b> Cast Now</b>
							</button>
							<h2 style={{ marginTop: "20px" }}>Winners</h2>
							<p style={{ marginTop: "10px" }}>
								<b>1st : </b>0x20613aB...c8697
							</p>
							<p>
								<b>2nd : </b>0x20613aB...c8697
							</p>
							<p>
								<b>3rd : </b>0x20613aB...c8697
							</p>
						</div>
					</div>
				</div>

				<div style={{ margin: "10px" }} className="contest-details"></div>
			</div>
		</Container>
	);
}

export default Contest;
