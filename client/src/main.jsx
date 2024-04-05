import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux";
import { PrivyProvider } from "@privy-io/react-auth";
import { TablelandProvider } from "./contexts/Tableland";
import toast, { Toaster } from 'react-hot-toast';

// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// const client = new ApolloClient({
// 	uri: import.meta.env.VITE_GRAPHQL_CLIENT,
// 	cache: new InMemoryCache(),
// });

ReactDOM.render(
	<React.StrictMode>
		<Toaster />
		{/* <ApolloProvider client={client}> */}
		<PrivyProvider
			appId="cltzqi0kf0gjpsd7f9c5r6lqx"
			config={{
				// Configures email, wallet, Google, Apple, and Farcaster login
				loginMethods: ["farcaster", "wallet"],
				appearance: {
					// Defaults to true
					showWalletLoginFirst: false,
				},
			}}
			// onSuccess={ () => ( window.location.href = "/" )
			onSuccess={() => console.log("login success")}
		>
			<Provider store={store}>
				<TablelandProvider>
					<App />
				</TablelandProvider>
			</Provider>
		</PrivyProvider>
		{/* </ApolloProvider> */}
	</React.StrictMode>,
	document.getElementById("root"),
);
