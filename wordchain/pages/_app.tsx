import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AlertState from '../context/alert/AlertState';
import WalletState from '../context/wallet/WalletState';
import { Toaster } from 'react-hot-toast';
import BoardState from '../context/board/BoardState';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AlertState>
			<BoardState>
				<WalletState>
					<Toaster position='top-right' />
					<Component {...pageProps} />
				</WalletState>
			</BoardState>
		</AlertState>
	);
}

export default MyApp;
