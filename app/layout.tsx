import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
	title: 'My App',
	description: 'An app using Dynamic Labs authentication',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
