'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import {
	DynamicContextProvider,
	DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { createConfig, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { FlowWalletConnectors } from '@dynamic-labs/flow';

const AuthContext = createContext({});

const config = createConfig({
	chains: [mainnet],
	multiInjectedProviderDiscovery: false,
	transports: {
		[mainnet.id]: http(),
	},
});

const queryClient = new QueryClient();

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	return (
		<DynamicContextProvider
			settings={{
				environmentId:
					process.env.NEXT_PUBLIC_ENVIRONMENT_ID ||
					'default_environment_id', // Replace with your environment ID
				walletConnectors: [
					EthereumWalletConnectors,
					FlowWalletConnectors,
				],
			}}
		>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<DynamicWagmiConnector>
						{children}
						<DynamicWidget />
					</DynamicWagmiConnector>
				</QueryClientProvider>
			</WagmiProvider>
		</DynamicContextProvider>
	);
}

export const useAuth = () => useContext(AuthContext);
