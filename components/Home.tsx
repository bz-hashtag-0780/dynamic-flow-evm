'use client';

import React from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function Home() {
	const { user, setShowAuthFlow, handleLogOut } = useDynamicContext();

	const handleConnect = () => {
		setShowAuthFlow(true); // Opens the wallet connection modal
	};

	const handleDisconnect = () => {
		handleLogOut(); // Logs the user out
	};

	return (
		<div>
			<h1>Dynamic Labs Wallet Integration</h1>
			{user?.email ? (
				<div>
					<p>Connected as: {user?.email || 'Unknown User'}</p>
					<button onClick={handleDisconnect}>Disconnect</button>
				</div>
			) : (
				<button onClick={handleConnect}>Connect Wallet</button>
			)}
		</div>
	);
}
