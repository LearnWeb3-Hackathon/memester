import React from "react";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { Container, GithubAuth, GmailAuth } from "./Login.styled";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useTableland } from "../../contexts/Tableland";
import axios from "axios";
import API_URLS from "../../config.js";

// import { toast } from 'react-toastify';
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";



export default function Login() {
	// const onFailure = (r, es) => {
	// 	alert("");
	// };

	const { ready, authenticated, user } = usePrivy();
	const { wallets } = useWallets();
	const wallet = wallets[0]; // Replace this with your desired wallet

	const { readTable, writeTable, createTable } = useTableland();

	const CreateTable = async (res) => {

		try
		{
			
			const chainId = wallet?.chainId?.split(":")[1];
			const userAddress = user.wallet?.address;
			console.log("user address", userAddress)
			console.log( "chainid", chainId );
			console.log("url =>>>", import.meta.env.VITE_BACKEND_URL);
			const { data } = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/tableland?address=${userAddress}&networkId=${chainId}`,
			);
			console.log("Data ", data);
			if ( !data && !data?.length )
			{

				await createTable()
			}
			


		} catch (error) {
			console.error("Error fetching data:", error);
			
		}
	};
	const { login } = usePrivy();
	return (
		<Container>
			{/* <a href="/">
				<i className="fas fa-arrow-left"></i>
				Go Back
			</a> */}
			<header>
				<img src="/images/logo.png" className="logo" alt="Memester logo" />

				<p>Sign in to make your favourite memes and cast in Forcaster</p>

				<a className="btn btn-tertiary" onClick={login}>
					Log in {"  "}
					<i className="fas fa-arrow-right"></i>
				</a>
				<br />
				<br />
				<a className="btn btn-primary" onClick={CreateTable}>
					Create Your account in TableLand and start {"  "}
					<i className="fas fa-arrow-right"></i>
				</a>
				
			</header>
		</Container>
	);
}
